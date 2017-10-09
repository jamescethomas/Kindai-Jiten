import React, { Component } from 'react';

import CloseIcon from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import Strings from 'react-l20n-u';

class Example extends Component {
  handleCloseIconClick() {
    this.props.removeExample(this.props.id);
  }

  onChangeFunction(component, value) {
    this.props.updateExample(this.props.id, value);
  }

  render() {
    return(
      <div>
        {
          (this.props.showDeleteIcon) &&
          <CloseIcon
            style={{position:'relative', left: '260px'}}
            onClick={this.handleCloseIconClick.bind(this)}
          />
        }

        <TextField
          value={this.props.exampleText}
          onChange={this.onChangeFunction.bind(this)}
          style={{textAlign: 'left'}}
          floatingLabelText={Strings.get('example')}
          multiLine={true}
          fullWidth={true}
          rows={2}
          errorText={this.props.errorText}
        />
      </div>
    );
  }
}

export default Example;
