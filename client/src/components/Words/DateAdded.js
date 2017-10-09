import React, { Component } from 'react';
import Strings from 'react-l20n-u';

class DateAdded extends Component {
  render() {
    const style = {
      textAlign: 'left',
      fontSize: '15px',
      fontStyle: 'italic',
      display: 'inline-block',
      float: 'right',
      color: '#ddd'
    }

    var date = new Date(this.props.dateAdded);

    var options = {
        year: "numeric",
        month: "short",
        day: "numeric"
    };

    var format = Strings.getRaw('date-format');

    return(
      <div style={style}>
        {date.toLocaleDateString(format, options)}
      </div>
    );
  }
}

export default DateAdded;
