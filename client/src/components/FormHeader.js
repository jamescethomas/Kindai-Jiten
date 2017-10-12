import React, { Component } from 'react';

class FormHeader extends Component {
  style = {
    float: 'left',
    fontSize: '20px',
    color: 'rgba(0, 0, 0, 0.75)',
    textAlign: 'left',
    width: '100%'
  }

  subTextStyle = {
    fontSize: '15px',
    color: 'rgba(0, 0, 0, 0.50)'
  }

  render() {
    return (
      <div style={this.style}>
        {this.props.text}
        {(this.props.subText) &&
          <div style={this.subTextStyle}>
            {this.props.subText}
          </div>
        }
      </div>
    );
  }
}

export default FormHeader;
