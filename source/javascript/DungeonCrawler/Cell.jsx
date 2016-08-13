// React.
import React from 'react';

class Cell extends React.Component {

  // Component constructor.
  constructor() {
    super();
  }

  // Component render.
  render() {
    return (
      <div className="cell">
        {String(this.props.contents)}
      </div>
    )
  }
}

export default Cell;
