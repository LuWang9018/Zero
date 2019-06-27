import React, { Component } from 'react';
import { TopBar, AppProvider, Frame } from '@shopify/polaris';
import { connect } from 'react-redux';
import { authenticate, getUser } from 'modules/users';
import SiginForm from 'components/SignInForm';
import PropTypes from 'prop-types';
import { theme } from '../../../utils/globals';

class SignIn extends Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  login = async (username, password) => {
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
    return (
      <div style={{ height: '500px' }}>
        <AppProvider theme={theme}>
          <Frame topBar={topBarMarkup}>
            <SiginForm login={this.login} />
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
