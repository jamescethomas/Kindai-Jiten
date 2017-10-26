import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Strings from 'react-l20n-u';
import Animation from 'utils/Animation.js';

// Responsiveness
import { DesktopBreakpoint } from 'utils/Responsive.js';
import { TabletBreakpoint } from 'utils/Responsive.js';
import { PhoneBreakpoint } from 'utils/Responsive.js';

class BottomBar extends Component {
  componentDidMount() {
    Animation.slideUpAnimation(this.refs.bottomBar);
  }

  renderSmallBottomBar() {
    const style = {
      height: '42px',
      width: 'calc(100% - 20px)',
      backgroundColor: '#e4e7f3',
      position: 'absolute',
      bottom: '0',
      color: 'rgb(0, 188, 212)',
      paddingTop: '14px',
      paddingLeft: '10px',
      paddingRight: '10px',
      fontWeight: 'lighter',
      fontSize: '10px',
      textAlign: 'center'
    }

    const likesStyle = {
      userSelect: 'none'
    }

    return (
      <div style={style} ref="bottomBar" className="bottom-bar">
        <div style={likesStyle} className="links">
          <span
            className="link"
            onClick={() => {this.props.history.push('/contact')}}
          >
          {Strings.get('contact')}
          </span> | <span
            className="link"
            onClick={() => {this.props.history.push('/about')}}
          >
          {Strings.get('about')}
          </span>
        </div>

        <div className="copy-right">
          {Strings.get('copy-right')}
        </div>
      </div>
    )
  }

  render() {
    const style = {
      height: '38px',
      width: 'calc(100% - 100px)',
      backgroundColor: '#e4e7f3',
      position: 'absolute',
      bottom: '0',
      color: 'rgb(0, 188, 212)',
      paddingTop: '18px',
      paddingLeft: '50px',
      paddingRight: '50px',
      fontWeight: 'lighter'
    }

    const likesStyle = {
      float: 'right',
      userSelect: 'none'
    }

    return (
      <span>
        <DesktopBreakpoint>
          <div style={style} ref="bottomBar" className="bottom-bar">
            <span className="copy-right">
              {Strings.get('copy-right')}
            </span>
            <span style={likesStyle} className="links">
              <span
                className="link"
                onClick={() => {this.props.history.push('/contact')}}
              >
              {Strings.get('contact')}
              </span> | <span
                className="link"
                onClick={() => {this.props.history.push('/about')}}
              >
              {Strings.get('about')}
              </span>
            </span>
          </div>
        </DesktopBreakpoint>
        <TabletBreakpoint>
          {this.renderSmallBottomBar()}
        </TabletBreakpoint>
        <PhoneBreakpoint>
          {this.renderSmallBottomBar()}
        </PhoneBreakpoint>
      </span>
    )
  }
}

export default withRouter(BottomBar);
