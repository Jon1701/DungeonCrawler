// React.
import React from 'react';

// Other libraries.
import classNames from 'classnames';

////////////////////////////////////////////////////////////////////////////////
// <Cell/> component definition
////////////////////////////////////////////////////////////////////////////////
class Cell extends React.Component {

  //////////////////////////////////////////////////////////////////////////////
  // Component constructor.
  //////////////////////////////////////////////////////////////////////////////
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Component render.
  //////////////////////////////////////////////////////////////////////////////
  render() {

    // Classes.
    var myClasses = classNames({
      'cell': true,
      'cell-wall': this.props.contents.type == 'wall',
      'cell-free': this.props.contents.type == 'free',
      'cell-player': this.props.contents.type == 'player',
      'cell-medkit': this.props.contents.type == 'item' && this.props.contents.name == 'medkit',
      'cell-weapon': this.props.contents.type == 'item' && this.props.contents.name == 'weapon',
      'cell-enemy': this.props.contents.type == 'enemy',
      'cell-boss': this.props.contents.type == 'enemy' && this.props.contents.name == 'boss',
    });

    return (
      <div className={myClasses}/>
    )
  }
}

export default Cell;
