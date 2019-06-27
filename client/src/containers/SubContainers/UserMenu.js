import React from 'react';
import PropTypes from 'prop-types';

import { TopBar } from '@shopify/polaris';
import { connect } from 'react-redux';
import { getUser, logout } from '../../modules/users';

export class UserMenu extends React.Component {
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
    };
  }

  componentDidUpdate(prevProps, context) {
    //if no user info
    if (this.props !== prevProps) {
      //console.log('user menu update');
      //console.log(this.store.getState().users);
      const userInfo = this.store.getState().users.user;
      //console.log(userInfo);
      this.setState({
        userInfo: userInfo,
      });
    }

    //console.log('user menu userInfo:', this.state.userInfo);
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
    const { userMenuOpen, userInfo } = this.state;

    const userMenuActions = [
      {
        items: [{ content: 'Sign Out', onAction: this.logout }],
      },
    ];

    return (
      <TopBar.UserMenu
        actions={userMenuActions}
        name={userInfo ? userInfo.username : 'unknow'}
        detail={''}
        initials={userInfo ? userInfo.username.charAt(0).toUpperCase() : ''}
        open={userMenuOpen}
        onToggle={this.toggleState('userMenuOpen')}
      />
    );
  }
}

export default connect(
  state => ({
    user: getUser(state),
  }),
  { logout }
)(UserMenu);
