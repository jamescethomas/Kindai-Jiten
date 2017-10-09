import React, { Component } from 'react';

class Example extends Component {
  render() {
    const style = {
      textAlign: 'left',
      fontSize: '15px',
      fontStyle: 'italic',
      whiteSpace: 'pre-wrap'
    }
    return(
      <div style={style}>
        {this.props.exampleText}
      </div>
    );
  }
}

export default Example;
