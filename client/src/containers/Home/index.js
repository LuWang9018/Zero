import React from 'react';
import {
  Card,
  Modal,
  FormLayout,
  TextField,
  AppProvider,
  SkeletonBodyText,
  Layout,
  TextContainer,
  SkeletonDisplayText,
  Frame,
  Loading,
  Page,
  SkeletonPage,
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, logout } from '../../modules/users';
import { LeftNavigation } from '../SubContainers/leftNavigation';
import { MyTopBar } from '../SubContainers/topBar';

import { theme } from '../../utils/globals';

class Home extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.store = context.store;

    this.state = {
      showToast: false,
      isLoading: false,
      searchActive: false,
      userMenuOpen: false,
      showMobileNavigation: false,
      modalActive: false,
    };
  }

  componentDidUpdate(prevProps) {
    //if no user info
    if (this.props !== prevProps && this.store) {
      //console.log('Home update');
      const userInfo = this.store.getState().users.user;
      //console.log(userInfo);
      this.setState({
        userInfo: userInfo,
      });
    }
  }

  render() {
    //console.log('store', this.context.store.getState());
    const {
      isLoading,
      showMobileNavigation,
      nameFieldValue,
      emailFieldValue,
      modalActive,
    } = this.state;

    const topBarMarkup = <MyTopBar logout={this.props.logout} />;

    const navigationMarkup = <LeftNavigation toggleState={this.toggleState} />;

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Home">
        <Layout>
          <Layout.AnnotatedSection
            title="Account details"
            description="Jaded Pixel will use this as your account information."
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Full name"
                  value={nameFieldValue}
                  onChange={this.handleNameFieldChange}
                />
                <TextField
                  type="email"
                  label="Email"
                  value={emailFieldValue}
                  onChange={this.handleEmailFieldChange}
                />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
      </Page>
    );

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={9} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState('modalActive')}
        title="Contact support"
        primaryAction={{
          content: 'Send',
          onAction: this.toggleState('modalActive'),
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={this.state.supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label="Message"
              value={this.state.supportMessage}
              onChange={this.handleMessageChange}
              multiline
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );

    return (
      <div style={{ height: '500px' }}>
        <AppProvider theme={theme}>
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState('showMobileNavigation')}
          >
            {loadingMarkup}
            {pageMarkup}
            {modalMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  toggleState = key => {
    return () => {
      this.setState(prevState => ({ [key]: !prevState[key] }));
    };
  };
}

export default connect(
  state => ({
    user: getUser(state),
  }),
  { logout }
)(Home);
