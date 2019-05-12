import React, { Component } from 'react';
import { TopBar, AppProvider, Frame } from '@shopify/polaris';
import { connect } from 'react-redux';
import { createNewUser, getUser } from 'modules/users';
import SignUpForm from 'components/SignUpForm';
import PropTypes from 'prop-types';

const theme = {
  colors: {
    topBar: {
      background: '#357997',
    },
  },
  logo: {
    width: 124,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
    contextualSaveBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
    url: 'http://jadedpixel.com',
    accessibilityLabel: 'Jaded Pixel',
  },
};

class SignUp extends Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  signup = async (username, password, email) => {
    const { createNewUser } = this.props;
    const { router } = this.context;
    if (!username || !password || !email) {
      return;
    }
    const user = await createNewUser({ username, password, email });
    if (user) {
      router.history.push('/');
    }
  };

  handleFieldChange = (key, value) => this.setState({ [key]: value });

  render() {
    const { user } = this.props;
    const { router } = this.context;
    if (user) {
      router.history.push('/');
    }
    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        onNavigationToggle={e =>
          this.handleFieldChange('showMobileNavigation', e)
        }
      />
    );

    return (
      <div style={{ height: '500px' }}>
        <AppProvider theme={theme}>
          <Frame topBar={topBarMarkup}>
            <SignUpForm signup={this.signup} />
          </Frame>
        </AppProvider>
      </div>
    );
  }
}

export default connect(
  state => ({ user: getUser(state) }),
  { createNewUser }
)(SignUp);
