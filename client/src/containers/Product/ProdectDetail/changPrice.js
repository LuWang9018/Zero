import { Modal, FormLayout, TextField, Button } from '@shopify/polaris';
import React from 'react';
//import uuid from 'uuid';
import { updatePrice } from '../../../modules/price';
import { inputCheck } from '../../../utils/inputCheck';

const productAttrs = [
  {
    name: 'historyPrice',
    displayName: 'Set price to',
    type: 'currency',
    min: 0,
  },
];

export class ChangePrice extends React.Component {
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

    await this.setState({ title: 'Change Price' });
    for (let i in productAttrs) {
      let attrName = productAttrs[i].name;
      if (productAttrs[i].default !== undefined) {
        await this.setState({ [attrName]: productAttrs[i].default });
      } else {
        await this.setState({ [attrName]: this.props.productInfo[attrName] });
      }
    }

    // await this.setState({
    //   quantityAfterChange: this.state.productInfo
    //     ? this.state.productInfo.itemStock
    //     : 0,
    // });
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
        body.isSale = true;
        body.priceChangeTime = Date.now();
        body.editedBy = this.state.userInfo.userId;

        await updatePrice(this.state.productInfo.itemId, body);
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
          key={'changePrice_' + attrDisplayName}
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
    const changePriceCard = <FormLayout>{this.genInputFields()}</FormLayout>;
    return (
      <div
        style={
          {
            //height: '500px'
          }
        }
      >
        <Button primary onClick={() => this.handleOpen()}>
          {'Edit Price'}
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
          <Modal.Section>{changePriceCard}</Modal.Section>
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
