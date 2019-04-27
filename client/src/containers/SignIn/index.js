import React, { Component } from 'react';
import { TopBar, AppProvider, Frame } from '@shopify/polaris';
import { connect } from 'react-redux';
import { authenticate, createNewUser, getUser } from 'modules/users';
import SiginForm from 'components/SignInForm';
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

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  };

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  login = async () => {
    const { username, password } = this.state;
    const { authenticate } = this.props;
    const { router } = this.context;
    const user = await authenticate(username, password);
    if (user) {
      router.history.push('/');
    }
  };

  register = async () => {
    const { newusername, newpassword, newemail } = this.state;
    const { createNewUser } = this.props;
    const { router } = this.context;
    const user = await createNewUser(newusername, newpassword, newemail);
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

    const { username, password } = this.state;

    return (
      <div style={{ height: '500px' }}>
        <AppProvider theme={theme}>
          <Frame topBar={topBarMarkup}>
            <SiginForm
              username={username}
              password={password}
              onChange={this.handleFieldChange}
              login={this.login}
            />
          </Frame>
        </AppProvider>
      </div>
    );
  }
}

export default connect(
  state => ({ user: getUser(state) }),
  { authenticate }
)(SignIn);
