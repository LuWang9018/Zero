import React from 'react';
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
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class LeftNavigation extends React.Component {
  render() {
    return (
      <Navigation location='/' userMenu={this.props.navigationUserMenuMarkup}>
        <Navigation.Section
          items={[
            {
              label: 'Back to Shopify',
              icon: 'arrowLeft',
            },
          ]}
        />
        <Navigation.Section
          separator
          title='Jaded Pixel App'
          items={[
            {
              label: 'Dashboard',
              icon: 'home',
              onClick: this.toggleState('isLoading'),
            },
            {
              label: 'Stock',
              icon: 'orders',
              onClick: this.toggleState('isLoading'),
            },
          ]}
          action={{
            icon: 'conversation',
            accessibilityLabel: 'Contact support',
            onClick: this.toggleState('modalActive'),
          }}
        />
      </Navigation>
    );
  }
}
