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
              {Strings.get('about-line-1')}
              <br/><br/>
              {Strings.get('about-line-2')}
              <br/><br/>
              {Strings.get('about-line-3-part-1')}
               <Link href="define" text={Strings.get('about-line-3-link')}></Link>
               {Strings.get('about-line-3-part-2')}
              <br/>
              {Strings.get('about-line-4-part-1')}
               <Link href="login" text={Strings.get('about-line-4-link')}></Link>
               {Strings.get('about-line-4-part-2')}
              <br/><br/>
              {Strings.get('about-line-5-part-1')}
               <Link href="contact" text={Strings.get('about-line-5-link')}></Link>
               {Strings.get('about-line-5-part-2')}
            </span>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default About;
