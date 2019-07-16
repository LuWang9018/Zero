import React from 'react';
import { Navigation } from '@shopify/polaris';

export class LeftNavigation extends React.Component {
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
              url: `*`,
              onClick: this.props.toggleState('isLoading'),
            },
            {
              label: 'Stock',
              icon: 'orders',
              url: '/Stock',
              onClick: this.props.toggleState('isLoading'),
            },
            {
              label: 'Shopping Cart',
              icon: 'orders',
              url: '/ShoppingCart',
              onClick: this.props.toggleState('isLoading'),
            },
          ]}
          action={{
            icon: 'conversation',
            accessibilityLabel: 'Contact support',
            onClick: this.props.toggleState('isLoading'),
          }}
        />
      </Navigation>
    );
  }
}
