import React, { Component } from 'react';
import {
  Card,
  TopBar,
  FormLayout,
  TextField,
  AppProvider,
  Layout,
  Frame,
  Page,
  Button,
} from '@shopify/polaris';
import { connect } from 'react-redux';
import { authenticate } from 'modules/users';
import { getUser } from '../../modules/users';
import PropTypes from 'prop-types';

class SignIn extends Component {
  state = {};

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

  render() {
    const { username, password } = this.state;
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
    const markUp = (
      <Page>
        <Layout>
          <Layout.AnnotatedSection
            title="Sign In"
            description={
              <a
                style={{ textDecoration: 'none', color: '#357997' }}
                href="/forget_passowrd"
              >
                forget password?{' '}
              </a>
            }
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Username"
                  value={username}
                  onChange={data => this.handleFieldChange('username', data)}
                />
                <TextField
                  type="password"
                  label="Password"
                  value={password}
                  onChange={data => this.handleFieldChange('password', data)}
                />
                <Button primary onClick={this.login}>
                  Login
                </Button>
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );

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

    return (
      <div style={{ height: '500px' }}>
        <AppProvider theme={theme}>
          <Frame topBar={topBarMarkup}>{markUp}</Frame>
        </AppProvider>
      </div>
    );
  }

  handleFieldChange = (key, value) => this.setState({ [key]: value });
}

export default connect(
  state => ({ user: getUser(state) }),
  { authenticate }
)(SignIn);
