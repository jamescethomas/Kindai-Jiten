import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Link extends Component {
  onClick() {
    this.props.history.push(this.props.href);
  }

  render() {
    return (
      <span className="link" onClick={this.onClick.bind(this)}>
        {this.props.text}
      </span>
    );
  }
}


export default withRouter(Link)
