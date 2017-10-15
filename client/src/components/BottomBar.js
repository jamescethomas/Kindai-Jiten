import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Strings from 'react-l20n-u';

class BottomBar extends Component {
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
      <div style={style}>
        <span className="copy-right">
          {Strings.get('copy-right')}
        </span>
        <span style={likesStyle}>
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
    )
  }
}

export default withRouter(BottomBar);
