import {
  Card,
  ActionList,
  TopBar,
  Navigation,
  Modal,
  FormLayout,
  TextField,
  AppProvider,
  SkeletonBodyText,
  Layout,
  TextContainer,
  SkeletonDisplayText,
  Frame,
  Toast,
  ContextualSaveBar,
  Loading,
  Page,
  SkeletonPage,
  ResourceList,
  Button,
  Stack,
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, logout } from '../../../modules/users';
import { getMyStocks } from '../../../modules/stock';
import { LeftNavigation } from '../../SubContainers/LeftNavigation';
import React, { useState } from 'react';
import { addStock } from '../../../modules/stock';
import { inputCheck } from '../../../utils/inputCheck';
const DISCOUNT_LINK = 'https://polaris.shopify.com/';

const productAttrs = [
  {
    name: 'imageUrl',
    type: 'image',
  },
  {
    name: 'itemName',
    displayName: 'Name',
    type: 'string',
    notNull: true,
  },
  {
    name: 'itemCode',
    displayName: 'Code',
    type: 'string',
  },

  {
    name: 'itemStock',
    displayName: 'Stock',
    type: 'number',
    min: 0,
  },
  {
    name: 'itemBarcode',
    displayName: 'Barcode',
    type: 'string',
  },
  {
    name: 'itemCurrentPrice',
    displayName: 'Price',
    type: 'number',
    min: 0,
  },
  // {
  //   name: 'itemDiscount',
  //   displayName: 'Discount',
  //   type: 'number',
  //   max: 1,
  //   min: 0,
  // },
  // {
  //   name: 'details',
  //   type: 'json',
  // },
];

export class AddProduct extends React.Component {
  state = {
    active: true,
  };

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
  }

  async resetAllAttrs() {
    for (let i in productAttrs) {
      let attrName = productAttrs[i].name;
      this.setState({ [attrName]: undefined });
    }
  }

  async handleOpen() {
    await this.toggleModal();
    if (this.props.action === 'ADD') {
      await this.setState({
        title: 'Add New Product',
        ownerId: this.props.ownerId,
      });
      for (let i in productAttrs) {
        let attrName = productAttrs[i].name;
        await this.setState({ [attrName]: undefined });
      }
    } else if (this.props.action === 'EDIT') {
      await this.setState({ title: 'Edit Product' });
    }
  }

  async handleClose() {
    await this.resetAllAttrs();
    await this.toggleModal();
  }

  async submit() {
    try {
      let body = await this.checkAndCompose();
      console.log('body', body);
      if (this.props.action === 'ADD') {
        await addStock(this.props.ownerId, body);
      } else if (this.props.action === 'EDIT') {
      }
      await this.toggleModal();
    } catch (err) {
      console.log(err);
    }
  }

  genInputFields() {
    let DOMs = [];

    for (let i in productAttrs) {
      let attrName = productAttrs[i].name;
      let attrDisplayName = productAttrs[i].displayName;
      if (
        productAttrs[i].type === 'string' ||
        productAttrs[i].type === 'number'
      ) {
        DOMs.push(
          <TextField
            key={'AddProduct_' + attrDisplayName}
            label={attrDisplayName}
            value={this.state[attrName]}
            onChange={async data => this.stateHook(attrName, data)}
          />
        );
      }
    }
    return DOMs;
  }

  render() {
    const { active } = this.state;

    return (
      <div
        style={
          {
            //height: '500px'
          }
        }
      >
        <Button primary onClick={() => this.handleOpen()}>
          ADD PRODUCT
        </Button>
        <Modal
          open={active}
          onClose={this.toggleModal}
          title={this.state.title}
          primaryAction={{
            content: 'ADD',
            onAction: () => this.submit(),
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: () => this.handleClose(),
            },
          ]}
        >
          <Modal.Section>
            <FormLayout>{this.genInputFields()}</FormLayout>
          </Modal.Section>
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
