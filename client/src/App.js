import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Switch, Route } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions/actions.js';

import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Nav from 'components/Nav.js';
import BottomBar from 'components/BottomBar.js';
import Home from 'pages/Home/Home.js';
import Word from 'pages/Word/Word.js';
import Author from 'pages/Author/Author.js';
import Edit from 'pages/Edit/Edit.js';
import About from 'pages/About/About.js';
import Contact from 'pages/Contact/Contact.js';
import Define from 'pages/Define/Define.js';
import Login from 'pages/Login/Login.js';
import Profile from 'pages/Profile/Profile.js';

import './App.css';

import L20n from 'react-l20n-u';

import ENGLISH from './languages/en-US.js';
import JAPANESE from './languages/japanese.js';

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = { greeting: '' };

    this.myTheme = getMuiTheme({
      palette: {
        textColor: cyan500,
      },
      appBar: {
        height: 50,
      },
    });
  }

  render() {
    if (this.props.language === 'JP') {
      L20n.load('en', JAPANESE);
    } else {
      L20n.load('en', ENGLISH);
    }

    return (
      <div className="App">
        <div className="background-image"/>
        <div className="background-image-gradient"/>
        <MuiThemeProvider muiTheme={this.myTheme}>
          <div>
            <Nav />
          </div>
        </MuiThemeProvider>
        <div className="app-body">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/home/page/:page' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/about' component={About}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/define' component={Define}/>
            <Route path='/word/:word' component={Word}/>
            <Route path='/edit/:word' component={Edit}/>
            <Route path='/author/:userid/page/:page' component={Author}/>
            <Route path='/author/:userid' component={Author}/>
            <Route component={Home}/>
          </Switch>
        </div>
        <div>
          <BottomBar />
        </div>
      </div>
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


export default
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App));
// export default App;
