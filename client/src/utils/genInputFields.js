import { Modal, FormLayout, TextField, Button } from '@shopify/polaris';
import React from 'react';
//import uuid from 'uuid';

export class InputFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = { productAttrs: props.productAttrs };
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      await this.setState({ productAttrs: this.props.productAttrs });
    }
  }

  genInputFields() {
    let DOMs = [];
    let productAttrs = this.state.productAttrs;
    let productInfo = this.props.productInfo;
    // console.log('==========productAttrs', productAttrs);
    console.log('==========productInfo', productInfo);

    for (let i in productAttrs) {
      let attrName = productAttrs[i].name;
      let attrDisplayName = productAttrs[i].displayName;
      let value = productInfo[attrName]
        ? productInfo[attrName]
        : productAttrs[i].default;
      console.log(`========== ${attrName} value`, value);

      switch (productAttrs[i].type) {
        case 'string':
          this[productAttrs[i]] = productAttrs[i].default
            ? productAttrs[i].default
            : '';
          DOMs.push(
            <TextField
              key={'changeQuantity_' + attrDisplayName}
              label={attrDisplayName}
              value={value}
              type='string'
              onChange={async data => {
                await this.props.stateHook(attrName, data);
              }}
            />
          );
          break;
        case 'number':
          this[productAttrs[i]] = productAttrs[i].default
            ? productAttrs[i].default
            : 0;
          DOMs.push(
            <TextField
              key={'changeQuantity_' + attrDisplayName}
              label={attrDisplayName}
              value={value}
              type='number'
              min={productAttrs[i].min ? productAttrs[i].min : undefined}
              max={productAttrs[i].max ? productAttrs[i].max : undefined}
              onChange={async data => {
                await this.props.stateHook(attrName, data);
              }}
            />
          );
          break;

        default:
          break;
      }
    }

    return DOMs;
  }

  render() {
    return this.genInputFields();
  }
}
