import React, { Component } from 'react';

class Definition extends Component {
  render() {
    const style = {
      textAlign: 'left',
      fontSize: '15px',
      paddingBottom: '10px',
      whiteSpace: 'pre-wrap'
    }
    return(
      <div style={style}>
        {this.props.definition}
      </div>
    );
  }
}

export default Definition;
