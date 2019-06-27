import React from 'react';
import PropTypes from 'prop-types';

import { TopBar, Card, ActionList } from '@shopify/polaris';
import { connect } from 'react-redux';
import { getUser, logout } from '../../modules/users';
import { UserMenu } from './UserMenu';
export class MyTopBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.store = context.store;

    this.userMenuActions = props.userMenuActions
      ? props.userMenuActions
      : this.defaultAction;

    this.state = {
      userMenuOpen: false,
      userInfo: undefined,
      searchActive: false,
      searchText: '',
    };
  }

  componentDidUpdate(prevProps, context) {
    //if no user info
    if (this.props !== prevProps) {
      //console.log('Top Bar update');
      //console.log(this.store.getState().users);
      const userInfo = this.store.getState().users.user;
      //console.log(userInfo);
      this.setState({
        userInfo: userInfo,
      });
    }

    //console.log('Top Bar userInfo:', this.state.userInfo);
  }

  logout = async () => {
    const { logout } = this.props;
    await logout();
    const { router } = this.context;
    router.history.push('/login');
  };

  toggleState = key => {
    return () => {
      this.setState(prevState => ({ [key]: !prevState[key] }));
    };
  };

  render() {
    const { searchActive, searchText } = this.state;

    //const { userMenuOpen, userInfo } = this.state;

    const userMenuMarkup = <UserMenu logout={this.props.logout} />;

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

    return (
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
  }

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: '',
      };
    });
  };

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
}

export default connect(
  state => ({
    user: getUser(state),
  }),
  { logout }
)(UserMenu);
