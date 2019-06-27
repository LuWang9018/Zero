import { Modal, FormLayout, TextField, Button } from '@shopify/polaris';
import React from 'react';
//import uuid from 'uuid';
import { updateStockQuantity } from '../../../modules/stock';
import { inputCheck } from '../../../utils/inputCheck';

const productAttrs = [
  {
    name: 'quantityChange',
    displayName: 'Stock change amount',
    type: 'number',
    default: 0,
  },

  {
    name: 'quantityAfterChange',
    displayName: 'Or set stock number to',
    type: 'number',
    min: 0,
  },
];

export class ChangeStock extends React.Component {
  constructor(props, context) {
    super(props);

    this.isDirty = false;

    this.state = {
      active: false,
      quantityChange: 0,
    };

    if (props.productInfo) {
      this.state.productInfo = props.productInfo;
    }
    if (props.userInfo) {
      this.state.userInfo = props.userInfo;
    }
  }

  async componentDidUpdate(prevProps) {
    //if no user info
    if (this.props !== prevProps) {
      //console.log('Product List update');
      const userInfo = this.props.userInfo;
      const productInfo = this.props.productInfo;
      await this.setState({
        userInfo,
        productInfo,
      });
    }
  }

  node = null;

  async checkAndCompose() {
    let body = {};
    for (let i in productAttrs) {
      let attrName = productAttrs[i].name;
      if (this.state[attrName]) {
        let checkResult = inputCheck(productAttrs[i], this.state[attrName]);

        if (checkResult.status === 'OK') {
          body[attrName] = checkResult.data;
        } else {
          throw new Error(attrName + ' ' + checkResult.msg);
        }
      }
    }
    return body;
  }

  async stateHook(attr, data) {
    await this.setState({ [attr]: data });

    if (attr === 'quantityChange') {
      let quantityAfterChange = Number(
        Number(this.state.productInfo.itemStock) +
          Number(this.state.quantityChange)
      );
      await this.setState({
        quantityAfterChange,
      });
    }

    if (attr === 'quantityAfterChange') {
      let quantityChange = Number(
        Number(this.state.quantityAfterChange) -
          Number(this.state.productInfo.itemStock)
      );

      await this.setState({
        quantityChange,
      });
    }

    this.isDirty = true;
  }

  async resetAllAttrs() {
    for (let i in productAttrs) {
      let attrName = productAttrs[i].name;
      this.setState({ [attrName]: undefined });
    }
    this.isDirty = false;
  }

  async handleOpen() {
    await this.toggleModal();

    await this.setState({ title: 'Change Stock' });
    for (let i in productAttrs) {
      let attrName = productAttrs[i].name;
      if (productAttrs[i].default !== undefined) {
        await this.setState({ [attrName]: productAttrs[i].default });
      } else {
        await this.setState({ [attrName]: this.props.productInfo[attrName] });
      }
    }

    await this.setState({
      quantityAfterChange: this.state.productInfo
        ? this.state.productInfo.itemStock
        : 0,
    });
    this.isDirty = false;
    //console.log('edit stock state:', this.state);
  }

  async handleClose() {
    await this.resetAllAttrs();
    await this.toggleModal();
  }

  async submit() {
    if (this.isDirty) {
      try {
        let body = await this.checkAndCompose();

        body.itemId = this.state.productInfo.itemId;
        body.quantityChange = Number(this.state.quantityChange);
        body.quantityChangeTime = Date.now();
        body.quantityAfterChange = Number(this.state.quantityAfterChange);
        body.type = 'edit';
        body.itemPrice = Number(this.state.productInfo.itemCurrentPrice);
        body.editedBy = this.state.userInfo.userId;

        await updateStockQuantity(this.state.productInfo.itemId, body);
        // updateStock(this.state.productInfo.itemId, body);
        await this.toggleModal();
      } catch (err) {
        console.log(err);
      }

      this.props.callBack();
    }

    this.isDirty = false;
  }

  genInputFields() {
    let DOMs = [];

    for (let i in productAttrs) {
      let attrName = productAttrs[i].name;
      let attrDisplayName = productAttrs[i].displayName;
      let attrType = productAttrs[i].type ? productAttrs[i].type : undefined;

      DOMs.push(
        <TextField
          key={'changeQuantity_' + attrDisplayName}
          label={attrDisplayName}
          value={this.state[attrName]}
          type={attrType}
          onChange={async data => {
            await this.stateHook(attrName, data);
          }}
        />
      );
    }
    return DOMs;
  }

  render() {
    const { active } = this.state;

    const productInfo = this.state.productInfo;

    //console.log('productInfo:', productInfo);
    const changeStockCard = (
      <FormLayout>
        <div>
          change from {productInfo ? productInfo.itemStock : 'Null'} to
          {' ' + this.state.quantityAfterChange}
        </div>
        {this.genInputFields()}
      </FormLayout>
    );
    return (
      <div
        style={
          {
            //height: '500px'
          }
        }
      >
        <Button primary onClick={() => this.handleOpen()}>
          {'Edit Stock'}
        </Button>
        <Modal
          open={active}
          onClose={this.toggleModal}
          title={this.state.title}
          primaryAction={{
            content: this.props.action === 'ADD' ? 'ADD' : 'EDIT',
            onAction: () => this.submit(),
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: () => this.handleClose(),
            },
          ]}
        >
          <Modal.Section>{changeStockCard}</Modal.Section>
        </Modal>
      </div>
    );
  }

  handleClick = () => {
    if (this.node == null) {
      return;
    }
    this.node.input.focus();
  };

  handleFocus = () => {
    if (this.node == null) {
      return;
    }
    this.node.input.select();
    document.execCommand('copy');
  };

  toggleModal = () => {
    this.setState(({ active }) => ({ active: !active }));
  };

  bindNode = node => {
    if (node == null) {
      return;
    }
    this.node = node;
  };
}
