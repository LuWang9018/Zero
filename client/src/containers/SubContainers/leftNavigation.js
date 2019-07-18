import React, { Component } from 'react';
import { Navigation } from '@shopify/polaris';
import PropTypes from 'prop-types';

export class LeftNavigation extends Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  render() {
    return (
      <Navigation location="/">
        <Navigation.Section
          separator
          title="Jaded Pixel App"
          items={[
            {
              label: 'Dashboard',
              icon: 'home',
              url: '',
              //onClick: e => this.context.router.history.push(''),
              //onClick: this.props.toggleState('isLoading'),
            },
            {
              label: 'Stock',
              icon: 'orders',
              url: '/stock',
              //onClick: e => this.context.router.history.push('/stock'),
              // onClick: this.props.toggleState('isLoading'),
            },
            {
              label: 'Shopping Cart',
              icon: 'orders',
              url: '/ShoppingCart',
              //onClick: e => this.context.router.history.push('/ShoppingCart'),
            },
          ]}
          // action={{
          //   icon: 'conversation',
          //   accessibilityLabel: 'Contact support',
          //   onClick: this.props.toggleState('isLoading'),
          // }}
        />
      </Navigation>
    );
  }
}
