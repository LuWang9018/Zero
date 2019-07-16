import React from 'react';

import {
  Card,
  AppProvider,
  SkeletonBodyText,
  Layout,
  TextContainer,
  SkeletonDisplayText,
  Frame,
  Loading,
  Page,
  SkeletonPage,
  List,
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, logout } from '../../../modules/users';
import { getMyStock } from '../../../modules/stock';
import { LeftNavigation } from '../../SubContainers/LeftNavigation';
import { MyTopBar } from '../../SubContainers/TopBar';
import { imageNotFount } from '../../../utils/globals';
import { AddProduct } from './addProduct';
import { theme } from '../../../utils/globals';
import { ChangeStock } from './changStock';
import { getStockChangeHistory } from '../../../modules/stock';
import { ChangePrice } from './changPrice';
import { ProductStockChangeGraph } from '../../SubContainers/productStockGraph';

class ProductDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  constructor(props, context) {
    super(props);
    this.store = context.store;

    let url = window.location.href;

    let itemId = url.substring(url.lastIndexOf('/') + 1);

    this.state = {
      Product: { itemId },
      showToast: false,
      isLoading: false,
      isDirty: false,
      searchActive: false,
      searchText: '',
      userMenuOpen: false,
      showMobileNavigation: false,
      modalActive: false,
      storeName: '',
      supportSubject: '',
      supportMessage: '',
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.store) {
      //console.log('Product Detail', this.store.getState().users);
      const userInfo = this.store.getState().users.user;
      await this.setState({
        userInfo: userInfo,
      });
      await this.updateStock();

      //console.log('Product Detail index state:', this.state);
    }
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  logout = async () => {
    const { logout } = this.props;
    await logout();
    const { router } = this.context;
    router.history.push('/login');
  };

  async updateStock() {
    const result = await getMyStock({ itemId: this.state.Product.itemId });
    await this.setState({ Product: result[0] });
    let stockChangeHistory = await getStockChangeHistory(
      this.state.Product.itemId
    );
    await this.setState({ stockChangeHistory });
  }

  async componentDidMount() {}

  render() {
    //console.log('store', this.context.store.getState());
    const { isLoading, showMobileNavigation } = this.state;

    const topBarMarkup = <MyTopBar logout={this.props.logout} />;

    const navigationMarkup = <LeftNavigation toggleState={this.toggleState} />;

    const loadingMarkup = isLoading ? <Loading /> : null;

    const productInfo = this.state.Product;

    const addProduct = this.state.userInfo ? (
      <AddProduct
        action='EDIT'
        userInfo={this.state.userInfo}
        productInfo={productInfo}
        callBack={() => {
          this.updateStock();
        }}
      />
    ) : null;

    const changeStock = this.state.userInfo ? (
      <ChangeStock
        action='EDIT'
        userInfo={this.state.userInfo}
        productInfo={productInfo}
        callBack={() => {
          this.updateStock();
        }}
      />
    ) : null;

    const changePrice = this.state.userInfo ? (
      <ChangePrice
        action='EDIT'
        userInfo={this.state.userInfo}
        productInfo={productInfo}
        callBack={() => {
          this.updateStock();
        }}
      />
    ) : null;

    //console.log(this.state.stockChangeHistory);

    const stockGraph = this.state.stockChangeHistory ? (
      <ProductStockChangeGraph data={this.state.stockChangeHistory} />
    ) : null;

    const actualPageMarkup = (
      <Page>
        <Card>
          <Layout>
            <Layout.Section secondary>
              <img
                src={
                  this.state.Product.imageUrl == null
                    ? imageNotFount
                    : this.state.Product.imageUrl
                }
                style={{ maxWidth: '100%' }}
                alt='Cannot Load'
              />
            </Layout.Section>
            <Layout.Section>
              <Card title={productInfo.itemName} sectioned>
                <Card.Section title='price'>
                  <p>{productInfo.itemCurrentPrice} $</p>
                </Card.Section>
                <Card.Section title='Information'>
                  <List>
                    <List.Item>Code: {productInfo.itemCode}</List.Item>
                    <List.Item>Stock: {productInfo.itemStock}</List.Item>
                  </List>
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        </Card>
        {addProduct}
        {changeStock}
        {changePrice}
        <div style={{ width: '40%' }}>{stockGraph}</div>
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

  handleSearchFieldChange = value => {
    this.setState({ searchText: value });
    if (value.length > 0) {
      this.setState({ searchActive: true });
    } else {
      this.setState({ searchActive: false });
    }
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: '',
      };
    });
  };

  handleSubjectChange = supportSubject => {
    this.setState({ supportSubject });
  };

  handleMessageChange = supportMessage => {
    this.setState({ supportMessage });
  };
}

export default connect(
  state => ({
    user: getUser(state),
  }),
  { logout }
)(ProductDetail);
