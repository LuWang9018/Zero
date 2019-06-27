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
  Toast,
  ContextualSaveBar,
  Loading,
  Page,
  SkeletonPage,
  ResourceList,
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, logout } from '../../../modules/users';
import { getMyStocks } from '../../../modules/stock';
import { genList } from './genList';
import { LeftNavigation } from '../../SubContainers/LeftNavigation';
import { MyTopBar } from '../../SubContainers/TopBar';

import { AddProduct } from '../ProdectDetail/addProduct';
import { theme } from '../../../utils/globals';

class Stock extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    this.store = context.store;

    this.state = {
      myStocks: [],
      isLoading: false,
      searchActive: false,
      showMobileNavigation: false,
      modalActive: false,
    };
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      //console.log('Product List update');
      const userInfo = this.store.getState().users.user;
      //console.log('Product List update', userInfo);
      await this.setState({
        userInfo: userInfo,
      });
      if (userInfo.userId) {
        await this.updateStock();
      }
    }
  }

  logout = async () => {
    const { logout } = this.props;
    await logout();
    const { router } = this.context;
    router.history.push('/login');
  };

  async updateStock() {
    console.log('user list:', this.state.userInfo);
    const result = await getMyStocks(this.state.userInfo.userId);
    await this.setState({ myStocks: result });
  }

  async componentDidMount() {}

  render() {
    //console.log('store', this.context.store.getState());
    const {
      showToast,
      isLoading,
      isDirty,
      showMobileNavigation,
      modalActive,
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState('showToast')}
        content='Changes saved'
      />
    ) : null;

    const contextualSaveBarMarkup = isDirty ? (
      <ContextualSaveBar
        message='Unsaved changes'
        saveAction={{
          onAction: this.handleSave,
        }}
        discardAction={{
          onAction: this.handleDiscard,
        }}
      />
    ) : null;

    const topBarMarkup = <MyTopBar logout={this.props.logout} />;

    const navigationMarkup = <LeftNavigation toggleState={this.toggleState} />;

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title='Stock'>
        <Layout>
          <Layout.Section>
            <AddProduct
              action='ADD'
              ownerId={
                this.state.userInfo ? this.state.userInfo.userId : undefined
              }
              callBack={() => {
                this.updateStock();
              }}
            />
            <Card sectioned>
              <ResourceList
                resourceName={{ singular: 'My item', plural: 'My items' }}
                items={this.state.myStocks}
                renderItem={genList}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size='small' />
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
        title='Contact support'
        primaryAction={{
          content: 'Send',
          onAction: this.toggleState('modalActive'),
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label='Subject'
              value={this.state.supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label='Message'
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
            {contextualSaveBarMarkup}
            {loadingMarkup}
            {pageMarkup}
            {toastMarkup}
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
)(Stock);
