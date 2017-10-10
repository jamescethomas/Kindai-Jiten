import React, { Component } from 'react';
import Example from 'pages/Define/Example.js';

class ExampleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxExamples: 3,
      disableAddExamples: false
    }
  }

  /**
   * Handle clicking on the add example button
   */
  handleAddExample() {
    var disableAddExamples = (this.props.examples.length+1 === this.state.maxExamples);

    // Add the example to the parent state
    this.props.addExample();

    // Update disableAddExamples
    this.setState((prevState) => {
      return {
        disableAddExamples: disableAddExamples
      }
    });
  }

  handleRemoveExample(exampleId) {
    var disableAddExamples = (this.props.examples.length-1 === this.state.maxExamples);

    this.props.removeExample(exampleId);

    // Update disableAddExamples
    this.setState((prevState) => {
      return {
        disableAddExamples: disableAddExamples
      }
    });
  }

  renderExamples() {
    return (
      <div>
        {this.props.examples.map((example, index) => (
          <Example
            showDeleteIcon={this.props.examples.length > 1}
            key={index}
            removeExample={this.handleRemoveExample.bind(this)}
            updateExample={this.props.updateExample}
            errorText={this.props.errorText}
            floatingLabelFixed={this.props.floatingLabelFixed}
            {...example} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.renderExamples()
        }
      </div>
    );
  }
}

/**
<FloatingActionButton
  disabled={this.state.disableAddExamples}
  mini={true} style={{float: 'right'}}
  onClick={this.handleAddExample.bind(this)}>
    <ContentAdd />
</FloatingActionButton>
**/

export default ExampleList;
