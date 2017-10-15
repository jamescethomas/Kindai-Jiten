import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Strings from 'react-l20n-u';

import MenuItems from './MenuItems.js';
import Search from 'components/Search/Search.js';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem';

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
      <span style={{verticalAlign: 'top'}}>
        {
          loggedIn
          ?
            <MenuItems />
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

    return (
      <div ref="nav">
        <AppBar
          title={false}
          titleStyle={{display: 'none'}}
          className="nav-bar"
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
              <FlatButton
                style={buttonStyle}
                label={Strings.get('about')}
                onClick={this.onAboutClicked.bind(this)}
              />
              <RaisedButton
                style={buttonStyle}
                secondary={true}
                label={Strings.get('define')}
                onClick={this.onDefineClicked.bind(this)}
              />
            </span>
            <span>
              <DropDownMenu
                labelStyle={{color: "#FFF"}}
                value={value}
                onChange={this.onDropdownChange.bind(this)}
                style={{width: 140}}
                autoWidth={false}
              >
                <MenuItem value={0} primaryText={Strings.get('en')} />
                <MenuItem value={1} primaryText={Strings.get('jp')} />
              </DropDownMenu>
            </span>
            {this.renderLoginButtom(this.props.loggedIn)}
          </span>
          <span style={searchStyle}>
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
