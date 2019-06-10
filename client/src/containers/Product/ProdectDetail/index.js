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
  List,
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, logout } from '../../../modules/users';
import { getMyStock } from '../../../modules/stock';
import { LeftNavigation } from '../../SubContainers/LeftNavigation';
import { imageNotFount } from '../../../utils/globals';
import { AddProduct } from './addProduct';

class ProductDetail extends React.Component {
  constructor(props, context) {
    super(props);
    this.store = context.store;

    let url = window.location.href;

    let itemId = url.substring(url.lastIndexOf('/') + 1);
    this.state = {
      myInfo: this.store.getState().users,
      Product: { itemId },
      showToast: false,
      isLoading: false,
      isDirty: false,
      searchActive: false,
      searchText: '',
      userMenuOpen: false,
      showMobileNavigation: false,
      modalActive: false,
      nameFieldValue: '',
      emailFieldValue: '',
      storeName: '',
      supportSubject: '',
      supportMessage: '',
    };
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextContext.store.getState().users);
    const userInfo = nextContext.store.getState().users.user;
    await this.setState({
      myInfo: Object.assign({}, userInfo),
      nameFieldValue: userInfo.username,
      emailFieldValue: userInfo.email,
    });
    await this.updateStock();

    console.log(this.state);
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
  }

  async componentDidMount() {}

  render() {
    //console.log('store', this.context.store.getState());
    const {
      showToast,
      isLoading,
      isDirty,
      searchActive,
      searchText,
      userMenuOpen,
      showMobileNavigation,
      nameFieldValue,
      emailFieldValue,
      modalActive,
      storeName,
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState('showToast')}
        content='Changes saved'
      />
    ) : null;

    const userMenuActions = [
      {
        items: [{ content: 'Sign Out', onAction: this.logout }],
      },
    ];

    const navigationUserMenuMarkup = (
      <Navigation.UserMenu
        actions={userMenuActions}
        name={nameFieldValue}
        detail={storeName}
        avatarInitials={nameFieldValue.charAt(0).toUpperCase()}
      />
    );

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

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={userMenuActions}
        name={nameFieldValue}
        detail={storeName}
        initials={nameFieldValue.charAt(0).toUpperCase()}
        open={userMenuOpen}
        onToggle={this.toggleState('userMenuOpen')}
      />
    );

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            { content: 'Shopify help center' },
            { content: 'Community forums' },
          ]}
        />
      </Card>
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={this.handleSearchFieldChange}
        value={searchText}
        placeholder='Search'
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
        onNavigationToggle={this.toggleState('showMobileNavigation')}
      />
    );

    const navigationMarkup = <LeftNavigation toggleState={this.toggleState} />;

    const loadingMarkup = isLoading ? <Loading /> : null;

    const productInfo = this.state.Product;

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
                  </List>
                </Card.Section>
              </Card>
            </Layout.Section>
          </Layout>
        </Card>
        <AddProduct action='EDIT' ownerId={this.state.myInfo.userId} />
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

  handleEmailFieldChange = emailFieldValue => {
    this.setState({ emailFieldValue });
    if (emailFieldValue != '') {
      this.setState({ isDirty: true });
    }
  };

  handleNameFieldChange = nameFieldValue => {
    this.setState({ nameFieldValue });
    if (nameFieldValue != '') {
      this.setState({ isDirty: true });
    }
  };

  handleSave = () => {
    this.defaultState.nameFieldValue = this.state.nameFieldValue;
    this.defaultState.emailFieldValue = this.state.emailFieldValue;

    this.setState({
      isDirty: false,
      showToast: true,
      storeName: this.defaultState.nameFieldValue,
    });
  };

  handleDiscard = () => {
    this.setState({
      emailFieldValue: this.defaultState.emailFieldValue,
      nameFieldValue: this.defaultState.nameFieldValue,
      isDirty: false,
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
