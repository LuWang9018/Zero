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
import { getUser, logout } from '../../modules/users';
import { getMyStock } from '../../modules/stock';

class UserStock extends React.Component {
  constructor(props, context) {
    super(props);

    this.store = context.store;

    this.state = {
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

    //if no user info
    if (!context.store.getState().users.user) {
      console.log('user-------------');

      context.router.history.push('/login');
    } else {
      this.user = context.store.getState().users.user;
      console.log('user-------------', this.user);

      this.state.nameFieldValue = this.user.username;
      this.state.emailFieldValue = this.user.email;
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    //if no user info
    if (!nextContext.store.getState().users.user) {
      console.log('-------------update');
      this.context.router.history.push('/login');
    } else {
      console.log('update');
      console.log(nextContext.store.getState().users);
      const userInfo = nextContext.store.getState().users.user;
      console.log(userInfo);
      this.setState({
        nameFieldValue: userInfo.username,
        emailFieldValue: userInfo.email,
      });
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

  async componentDidMount() {
    //await getMyStock(this.user.userId);
  }

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

    const navigationMarkup = (
      <Navigation location='/' userMenu={navigationUserMenuMarkup}>
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

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title='UserStock'>
        <Layout>
          <Layout.AnnotatedSection
            title='Account details'
            description='Jaded Pixel will use this as your account information.'
          >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label='Full name'
                  value={nameFieldValue}
                  onChange={this.handleNameFieldChange}
                />
                <TextField
                  type='email'
                  label='Email'
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
)(UserStock);
