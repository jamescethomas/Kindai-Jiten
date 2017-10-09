import React, { Component } from 'react';
import Example from './Example.js';

class ExampleList extends Component {
  renderExamples () {
    if (this.props.examples) {
      return (
        <div>
          {this.props.examples.map((example, index) => (
            <Example
              key={index}
              {...example} />
          ))}
        </div>
      );
    } else {
      return (<div/>);
    }
  }

  render() {
    const style = {
      textAlign: 'left',
      fontSize: '15px',
      paddingBottom: '10px'
    }

    return(
      <div style={style}>
        {
          this.renderExamples()
        }
      </div>
    );
  }
}

export default ExampleList;
