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
  Button,
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, logout } from '../../../modules/users';
import { getMyShoppingCartItems } from '../../../modules/order';
import { genItemList } from '../../SubContainers/genItemList';
import { LeftNavigation } from '../../SubContainers/leftNavigation';
import { MyTopBar } from '../../SubContainers/topBar';
import { CreateOrder } from '../NewOrder';
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
        await this.updateShoppingCart();
      }
    }
  }

  logout = async () => {
    const { logout } = this.props;
    await logout();
    const { router } = this.context;
    router.history.push('/login');
  };

  async updateShoppingCart() {
    //console.log('user list:', this.state.userInfo);
    const result = await getMyShoppingCartItems(this.state.userInfo.userId);
    const itemBySupplier = await this.groupBySupplier(result);

    await this.setState({ myStocks: result, itemBySupplier });
  }

  async componentDidMount() {}

  async groupBySupplier(item) {
    let itemsSupplierNames = [];
    let itemsBySupplier = [];
    for (let i = 0; i < item.length; i++) {
      let tmpSupplierName = item[i].itemSupplier
        ? item[i].itemSupplier
        : 'Unknow Supplier';
      let supplierNameIndex = itemsSupplierNames.indexOf(tmpSupplierName);
      if (supplierNameIndex !== -1) {
        itemsBySupplier[supplierNameIndex].items.push(item[i]);
      } else {
        itemsSupplierNames.push(tmpSupplierName);
        itemsBySupplier[itemsSupplierNames.length - 1] = {};
        itemsBySupplier[itemsSupplierNames.length - 1].name = tmpSupplierName;
        itemsBySupplier[itemsSupplierNames.length - 1].items = [item[i]];
      }
    }
    return itemsBySupplier;
  }

  genListBySupplier(itemsBySupplier) {
    if (!itemsBySupplier) return [];
    let listBySupplier = [];
    for (let i = 0; i < itemsBySupplier.length; i++) {
      const createOrder = <CreateOrder items={itemsBySupplier[i]} />;

      listBySupplier.push(
        <Card key={`ResourceList ${itemsBySupplier[i].name}`}>
          <div>
            <h2>{`Supplier: ${itemsBySupplier[i].name}`}</h2>
            <Card>
              <ResourceList
                resourceName={{ singular: 'My item', plural: 'My items' }}
                items={itemsBySupplier[i].items}
                renderItem={(
                  item,
                  id,
                  index,
                  other = {
                    userId: this.state.userInfo
                      ? this.state.userInfo.userId
                      : undefined,
                    action: 'shoppingCart',
                  }
                ) => genItemList(item, id, index, other)}
              />
            </Card>
            {createOrder}
          </div>
        </Card>
      );
    }

    return listBySupplier;
  }

  render() {
    //console.log('store', this.context.store.getState());

    //console.log(this.state.itemBySupplier);
    const itemBySupplier = this.state.itemBySupplier;
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
      <Page title='Shopping Cart'>
        <Layout>
          <Layout.Section>
            <Card sectioned>{this.genListBySupplier(itemBySupplier)}</Card>
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
