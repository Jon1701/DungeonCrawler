// React.
import React from 'react';

// Components.
import Row from './Row.jsx';


class Board extends React.Component {

  // Component constructor.
  constructor() {
    super();

    // Board dimensions.
    var nrows = 7;
    var ncols = 15;

    // Default state
    this.state = {
      nrows: nrows,
      ncols: ncols,
      grid: Array(nrows).fill(Array(ncols).fill(null))
    }
  }

  // Component render.
  render() {

    // Create <Row/> based on this.state.nrows.
    var rows = [];
    for(var i=0; i<this.state.nrows; i++) {

      // Store
      rows.push(
        <Row
          key={i}
          rowData={this.state.grid[i]}
          />
      );
    }

    return (
      <div className="board">
        {rows}
      </div>
    )
  }
}

export default Board;
