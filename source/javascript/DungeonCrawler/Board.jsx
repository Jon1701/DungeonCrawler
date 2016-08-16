// React.
import React from 'react';

// Components.
import Row from './Row.jsx';
import PlayerStats from './PlayerStats.jsx';

////////////////////////////////////////////////////////////////////////////////
// <Board/> component definition
////////////////////////////////////////////////////////////////////////////////
class Board extends React.Component {

  //////////////////////////////////////////////////////////////////////////////
  // *** DEBUG ONLY ***
  //
  // loads a custom map after <Board/> has mounted.
  //////////////////////////////////////////////////////////////////////////////
  componentWillMount() {

    // Dimensions.
    var nrows = 12;
    var ncols = 20;

    // Board variables.
    var wall = {type: 'wall'};
    var player = {type: 'player'};
    var free = {type: 'free'};
    var itemHP = {type: 'item', name: 'medkit', hp: 25};
    var itemWeapon = {type: 'item', name: 'weapon'};
    var enemyBasic = {type: 'enemy', name: 'basic', hp: 50, defaultHP: 50, outDamage: 3};
    var boss = {type: 'enemy', name: 'boss', hp: 300, defaultHP: 300, outDamage: 30}

    // Board.
    var grid = [
      [wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall],
      [wall,itemWeapon,itemHP,enemyBasic,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,itemWeapon,itemHP,enemyBasic,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,itemWeapon,itemHP,enemyBasic,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,itemWeapon,itemHP,enemyBasic,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,itemWeapon,itemHP,enemyBasic,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,itemWeapon,itemHP,enemyBasic,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,itemWeapon,itemHP,enemyBasic,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,itemWeapon,itemHP,enemyBasic,free,boss,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,player,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,free,wall],
      [wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall],

    ]

    // Update state.
    this.setState({
      grid: grid
    })

  }

  //////////////////////////////////////////////////////////////////////////////
  // Add keydown event listener once the <Board/> component has mounted.
  //////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress)
  }

  //////////////////////////////////////////////////////////////////////////////
  // Component constructor
  //////////////////////////////////////////////////////////////////////////////
  constructor() {
    super();

    // Board dimensions.
    var nrows = 12;
    var ncols = 20;

    // Bind the handleKeyPress function to <Board/>
    this.handleKeyPress = this.handleKeyPress.bind(this)

    // Default state
    this.state = {
      nrows: nrows,
      ncols: ncols,
      grid: Array(nrows).fill(Array(ncols).fill(null)),
      playerHealth: 100,
      playerHealthMax: 100,
      playerLevel: 1,
      playerLevelMax: 10,
      weaponLevel: 1,
      weaponLevelMax: 10,
      baseDamage: 10,
      damage: 10
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Gets the index of the player's cell on the grid.
  //////////////////////////////////////////////////////////////////////////////
  getPlayerIndex() {

    // Go through the grid.
    var grid = this.state.grid;
    for(var i=0; i<grid.length; i++) {
      for(var j=0; j<grid[i].length; j++) {

        // If we find the cell containing the user, return the row,
        // and column index.
        if (grid[i][j]['type'] == 'player') {
          return [i,j];
        }

      }
    }

  }

  //////////////////////////////////////////////////////////////////////////////
  // Handles keyboard key presses.
  //
  // WASD and arrow keys move the player across the board.
  //////////////////////////////////////////////////////////////////////////////
  handleKeyPress(e) {

    ////////////////////////////////////////////////////////////////////////////
    // Sets the contents of the next cell.
    //
    // Arguments:
    //  grid: a multidimensional array representing the board/grid.
    //  r:  the row index of the originating cell.
    //  c:  the column index of the originating cell.
    //  where: String to indicate the position of the next cell. Can be either:
    //         'up', 'down', 'left', or 'right'.
    //  contentName: String to indicate the contents of the cell. Can be either:
    //               'free', 'player', or 'wall'.
    ////////////////////////////////////////////////////////////////////////////
    var setNextCellContents = function(grid, r, c, where, contentName) {

      // The contents of a cell is an object.
      var cellContents = {};

      // Sets the type of the cell. Either 'free', 'player', or 'wall'.
      if (contentName == 'free') {
        cellContents['type'] = 'free';
      } else if (contentName == 'player') {
        cellContents['type'] = 'player';
      } else if (contentName == 'wall') {
        cellContents['type'] = 'wall';
      }

      // Sets the contents of the next cell to be modified to the grid.
      if (where == 'up') {
        grid[r-1][c] = cellContents;
      } else if (where == 'right') {
        grid[r][c+1] = cellContents;
      } else if (where == 'down') {
        grid[r+1][c] = cellContents;
      } else if (where = 'left') {
        grid[r][c-1] = cellContents;
      }

      // Return the modified grid.
      return grid;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Sets the contents of the current cell.
    //
    // Arguments:
    //  grid: a multidimensional array representing the board/grid.
    //  r:  the row index of the current cell.
    //  c:  the column index of the current cell.
    //  contentName: String to indicate the contents of the cell. Can be either:
    //               'free', 'player', or 'wall'.
    ////////////////////////////////////////////////////////////////////////////
    var setCurrentCellContents = function(grid, r, c, contentName) {

      // The contents of a cell is an object.
      var cellContents = {};

      // Sets the type of the cell. Either 'free', 'player', or 'wall'.
      if (contentName == 'free') {
        cellContents['type'] = 'free';
      } else if (contentName == 'player') {
        cellContents['type'] = 'player';
      } else if (contentName == 'wall') {
        cellContents['type'] = 'wall';
      }

      // Sets the contents of the current cell to be modified to the grid.
      grid[r][c] = cellContents;

      // Return the modified grid.
      return grid;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Gets the contents of the next cell.
    //
    // Arguments:
    //  grid: a multidimensional array representing the board/grid.
    //  r:  the row index of the originating cell.
    //  c:  the column index of the originating cell.
    //  where: String to indicate the position of the next cell. Can be either:
    //         'up', 'down', 'left', or 'right'.
    ////////////////////////////////////////////////////////////////////////////
    var getNextCellContents = function(grid, r, c, where) {

      if (where == 'up') {
        return grid[r-1][c];
      } else if (where == 'right') {
        return grid[r][c+1];
      } else if (where == 'down') {
        return grid[r+1][c];
      } else if (where = 'left') {
        return grid[r][c-1];
      }

    }

    ////////////////////////////////////////////////////////////////////////////
    // Checks to see whether or not the next cell is free.
    //
    // Arguments:
    //  grid: a multidimensional array representing the board/grid.
    //  r:  the row index of the originating cell.
    //  c:  the column index of the originating cell.
    //  where: String to indicate the position of the next cell. Can be either:
    //         'up', 'down', 'left', or 'right'.
    ////////////////////////////////////////////////////////////////////////////
    var isNextCellFree = function(grid, r, c, where) {
      return getNextCellContents(grid, r, c, where)['type'] == 'free';
    }

    // Access the grid.
    var grid = this.state.grid;

    // Get the index of the player cell on the grid, and separate the coordinates.
    var playerIndex = this.getPlayerIndex();
    var r = playerIndex[0];
    var c = playerIndex[1];

    // Determine the direction of the next cell depending on which key was pressed.
    // Only the WASD and Up/Down/Left/Right keys will be used.
    var nextCellDirection;
    if (e.code == 'KeyW' || e.code == 'ArrowUp') {
      nextCellDirection = 'up';
    } else if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
      nextCellDirection = 'left';
    } else if (e.code == 'KeyS' || e.code == 'ArrowDown') {
      nextCellDirection = 'down';
    } else  if (e.code == 'KeyD' || e.code == 'ArrowRight') {
      nextCellDirection = 'right';
    }

    // Check if the next cell is free.
    var nextFree = isNextCellFree(grid, r, c, nextCellDirection);

    // If it is free, move player to that cell, and free up the originating cell.
    if (nextFree) {

      grid = setNextCellContents(grid, r, c, nextCellDirection, 'player');
      grid = setCurrentCellContents(grid, r, c, 'free');

    } else {

      // Get the contents of the next cell.
      var nextCell = getNextCellContents(grid, r, c, nextCellDirection);

      // If the next cell is an item, check if it is a medkit or a weapon.
      if(nextCell['type'] == 'item') {

        // Allow movement to next cell.
        grid = setNextCellContents(grid, r, c, nextCellDirection, 'player');
        grid = setCurrentCellContents(grid, r, c, 'free');

        // If it is a weapon, increase weapon level.
        if (nextCell['name'] == 'weapon') {

          // If weapon level is below maximum, increase by 1.
          if(this.state.weaponLevel < this.state.weaponLevelMax) {
            this.setState({
              weaponLevel: this.state.weaponLevel + 1
            })
          }

        }

        // If it is a medkit, increase health.
        if (nextCell['name'] == 'medkit') {

          // If health is below maximum, add HP.
          if(this.state.playerHealth < this.state.playerHealthMax) {
            this.setState({
              playerHealth: this.state.playerHealth + nextCell['hp']
            });
          } else {
            this.setState({
              playerHealth: this.state.playerHealthMax
            });
          }

        }


      } else {

        // If it is an enemy
        if (nextCell['type'] == 'enemy') {

          // Get its hp and outgoing damage.
          var hp = nextCell['hp'];
          var outDamage = nextCell['outDamage'];

          // Do damage to the enemy.
          nextCell['hp'] = nextCell['hp'] - this.state.damage;

          // Player takes damage.
          this.setState({
            playerHealth: this.state.playerHealth - outDamage
          })

          // If HP is 0 or negative,
          if (hp <= 0) {

            // Increase player level.
            this.setState({
              playerLevel: this.state.playerLevel + 1
            });

            // Recalculate the players damage.
            // Damage = BaseDamage + PlayerLevel + 5*WeaponLevel
            this.setState({
              damage: this.state.baseDamage + this.state.playerLevel + 5*this.state.weaponLevel
            });

            // Allow movement to next cell.
            grid = setNextCellContents(grid, r, c, nextCellDirection, 'player');
            grid = setCurrentCellContents(grid, r, c, 'free');

            // Reset HP.
            nextCell['hp'] = nextCell['defaultHP']

          }

        }
      }

    }

    // Send the updated grid.
    this.setState({
      grid: grid
    })

  }

  //////////////////////////////////////////////////////////////////////////////
  // <Board/> component render
  //////////////////////////////////////////////////////////////////////////////
  render() {

    // Create <Row/> components based on the number of rows.
    var rows = [];
    for(var i=0; i<this.state.nrows; i++) {
      rows.push(
        <Row
          key={i}
          rowData={this.state.grid[i]}
          />
      );
    }

    return (
      <div className="board">

        <div>
          <PlayerStats
            playerHealth={this.state.playerHealth}
            playerHealthMax={this.state.playerHealthMax}
            playerLevel={this.state.playerLevel}
            weaponLevel={this.state.weaponLevel}
            damage={this.state.damage}
            />
        </div>

        {rows}
      </div>
    )
  }
}

export default Board;
