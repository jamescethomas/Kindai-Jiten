import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/menu';
import Strings from 'react-l20n-u';

import * as actions from 'actions/actions.js';

class MenuItems extends Component {
  static muiName = 'IconMenu';

  onProfileClick(event, index, value) {
    this.props.history.push('/profile');
  };

  onLogoutClicked() {
    this.props.actions.logoutUser();
    this.props.history.push('/home');
  };

  render() {
    const iconMenuProps = Object.assign({}, this.props);
    delete iconMenuProps.match
    delete iconMenuProps.location
    delete iconMenuProps.history
    delete iconMenuProps.staticContext

    const iconStyle = {
      color: "#FFF"
    }

    return (
      <IconMenu
        style={{verticalAlign: 'top'}}
        iconStyle={iconStyle}
        iconButtonElement={
          <IconButton><MoreVertIcon/></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText={Strings.get('profile')} onClick={this.onProfileClick.bind(this)}/>
        <MenuItem primaryText={Strings.get('logout')} onClick={this.onLogoutClicked.bind(this)}/>
      </IconMenu>
    );
  }
}

function mapStateToProps (state) {
  return {
    language: state.language
  }
}

function mapDispatchToProps (dispatch) {
  return {
    	actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MenuItems)
);
