import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Strings from 'react-l20n-u';
import _ from 'lodash';

import MenuItems from './MenuItems.js';
import Search from 'components/Search/Search.js';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem';

// Responsiveness
import { DesktopBreakpoint } from 'utils/Responsive.js';
import { DesktopTabletBreakpoint } from 'utils/Responsive.js';
import { TabletBreakpoint } from 'utils/Responsive.js';
import { PhoneBreakpoint } from 'utils/Responsive.js';

import * as actions from 'actions/actions.js';
import Animation from 'utils/Animation.js';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: true,
    };
  }

  buttonStyle = {
    color: '#FFF'
  };

  componentDidMount() {
    Animation.slideAnimation(this.refs.nav);
  }

  onHomeClicked(event, index, value) {
    this.props.history.push('/home');
  };

  onAboutClicked(event, index, value) {
    this.props.history.push('/about');
  };

  onDefineClicked() {
    this.props.history.push('/define');
  };

  onLoginClicked() {
    this.props.history.push('/login');
  };

  onLogoutClicked() {
    this.props.actions.logoutUser();
    this.props.history.push('/home');
  };

  onDropdownChange(event, value) {
    value = (value) ? 'JP' : 'EN';
    this.props.actions.changeLanguage(value);
  };

  handleChange(event, logged) {
    this.setState({logged: logged});
  };

  renderLoginButtom(loggedIn) {
    const buttonStyles = {
      verticalAlign: 'top',
      display: 'inline-block',
      lineHeight: '56px'
    }

    const buttonStyle = {
      lineHeight: '10px',
      color: '#FFF'
    }


    return (
      <span>
        {
          loggedIn
          ?
            <span />
          :
          <span style={buttonStyles}>
            <FlatButton
              style={buttonStyle}
              label={Strings.get('login')}
              onClick={this.onLoginClicked.bind(this)}
            />
          </span>
        }
      </span>
    )
  }

  render() {
    var value = (this.props.language === 'EN') ? 0 : 1;

    const buttonStyles = {
      verticalAlign: 'top',
      display: 'inline-block',
      lineHeight: '56px'
    }

    const buttonStyle = {
      lineHeight: '10px',
      color: '#FFF',
    }

    const searchStyle = {
      display: 'flex',
      lineHeight: '56px',
      marginLeft: '10px'
    }

    const navBarContentStyle = {
      maxWidth: '1000px',
      margin: 'auto',
      display: 'block'
    }

    var navClassName = "nav-bar";
    var menuStyle = (this.props.loggedIn) ? {marginLeft: '10px'}: {};

    return (
      <div ref="nav">
        <AppBar
          title={false}
          titleStyle={{display: 'none'}}
          className={navClassName}
          showMenuIconButton={false}
          style={{display: 'block'}}
        >
        <div style={navBarContentStyle}>
          <span
            style={buttonStyles}
            className="nav-title"
            onClick={this.onHomeClicked.bind(this)}
          >
            {Strings.get('app')}
          </span>

          <span style={{float: 'right', height: '56px'}}>
            <span style={buttonStyles}>
              <DesktopTabletBreakpoint>
                <FlatButton
                  style={buttonStyle}
                  label={Strings.get('about')}
                  onClick={this.onAboutClicked.bind(this)}
                />
              </DesktopTabletBreakpoint>
              <RaisedButton
                style={buttonStyle}
                secondary={true}
                className="define-button"
                label={
                  <span>
                    <DesktopTabletBreakpoint>
                      {Strings.get('define')}
                    </DesktopTabletBreakpoint>
                    <PhoneBreakpoint>
                      {Strings.get('define-short')}
                    </PhoneBreakpoint>
                  </span>
                }
                onClick={this.onDefineClicked.bind(this)}
              />
              {this.renderLoginButtom(this.props.loggedIn)}
              <span style={menuStyle}>
                <MenuItems />
              </span>
            </span>
          </span>
          <span style={searchStyle} className="search-bar-container">
            <Search/>
          </span>
        </div>
        </AppBar>

      </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Nav)
);
