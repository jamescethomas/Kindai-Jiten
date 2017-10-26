import React, { Component } from 'react';
import Strings from 'react-l20n-u';

// material-ui
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Custom
import App from 'App.js';
import FormHeader from 'components/FormHeader.js';
import Link from 'components/Link.js';
import Animation from 'utils/Animation.js';

class About extends Component {
  componentDidMount() {
    var elem = this.refs.about;
    Animation.initFadeAnimation(elem);
    Animation.fadeAnimation(elem);
  }

  render() {
    const style = {
      maxWidth: 600,
      margin: '20px auto 0',
      padding: 20,
      textAlign: 'left'
    }

    const pStyle = {
      fontSize: '15px',
      color: 'rgba(0, 0, 0, 0.60)'
    }

    return (
      <div ref="about">
        <MuiThemeProvider muiTheme={App.myTheme}>
          <Paper style={style} zDepth={1}>
            <FormHeader
              text={Strings.get('about')}
            />
            <br/>
            <span style={pStyle}>
              きんだい辞典 (Kindai Jiten) was created as a place to learn and explore japanese
              slang terms and colloquialisms that might not be found in a standard dictionary.
              <br/><br/>
              Languages are always changing and developing.
              <br/>
              きんだい辞典 aims to help shead some light on that evolution with the use of user submitted termanology.
              <br/><br/>
              If there is a word or phrase you would like to add, please click <Link href="define" text="this link"></Link> to share your contribution.
              <br/>
              If you would like to comment or like words please login with Facebook <Link href="login" text="here"/>.
              <br/><br/>
              Any feedback or suggestions about that site would be greatly appreciated! Please feel free to reach out via this <Link href="contact" text="contact form"/>.
            </span>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default About;
