import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/menu';
import Strings from 'react-l20n-u';

// Responsiveness
import { DesktopBreakpoint } from 'utils/Responsive.js';
import { TabletBreakpoint } from 'utils/Responsive.js';
import { PhoneBreakpoint } from 'utils/Responsive.js';

import * as actions from 'actions/actions.js';

class MenuItems extends Component {
  static muiName = 'IconMenu';

  onAboutClick(elem) {
    this.refs.menu.state.open = false;

    this.props.history.push('/about');
  }

  onProfileClick(event, index, value) {
    this.props.history.push('/profile');
  };

  onLogoutClicked() {
    this.props.actions.logoutUser();
    this.props.history.push('/home');
  };

  renderLanguageMenuItem() {
    const selectedStyle = {
      backgroundColor: 'rgba(0, 188, 212, 0.1)'
    }

    return (
      <MenuItem
        key="language"
        primaryText={Strings.get('language')}
        menuItems={[
          <MenuItem
            primaryText={Strings.get('jp')}
            style={(this.props.language === 'JP') ? selectedStyle : {}}
            onClick={() => { this.props.actions.changeLanguage('JP') }}
          />,
          <MenuItem
            primaryText={Strings.get('en')}
            style={(this.props.language === 'EN') ? selectedStyle : {}}
            onClick={() => { this.props.actions.changeLanguage('EN') }}
          />,
        ]}
      />
    );
  }

  render() {
    const iconMenuProps = Object.assign({}, this.props);
    delete iconMenuProps.match
    delete iconMenuProps.location
    delete iconMenuProps.history
    delete iconMenuProps.staticContext

    const iconStyle = {
      color: "#FFF"
    }

    var menuItems = []

    menuItems.push(
      <PhoneBreakpoint key="about">
        <MenuItem
          primaryText={Strings.get('about')}
          onClick={this.onAboutClick.bind(this)}
        />
      </PhoneBreakpoint>
    );

    if (this.props.loggedIn) {
      menuItems.push(<MenuItem key="profile" primaryText={Strings.get('profile')} onClick={this.onProfileClick.bind(this)}/>);
      menuItems.push(<MenuItem key="login" primaryText={Strings.get('logout')} onClick={this.onLogoutClicked.bind(this)}/>);
    }

    menuItems.push(this.renderLanguageMenuItem());

    return (
      <IconMenu
        style={{verticalAlign: 'top'}}
        iconStyle={iconStyle}
        iconButtonElement={
          <IconButton><MoreVertIcon/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        className="menu-items"
        ref="menu"
      >
        {menuItems}
      </IconMenu>
    );
  }
}

function mapStateToProps (state) {
  return {
    language: state.language,
    loggedIn: state.user.loggedIn
  }
}

function mapDispatchToProps (dispatch) {
  return {
    	actions: bindActionCreators(actions, dispatch)
    };
}

const wrappedComponent = withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuItems));
wrappedComponent.muiName = 'MenuItem';

export default wrappedComponent;
