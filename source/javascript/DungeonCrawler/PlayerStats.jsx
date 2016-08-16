// React.
import React from 'react';

// Other libraries.
import classNames from 'classnames';

////////////////////////////////////////////////////////////////////////////////
// <PlayerStats/> component definition
////////////////////////////////////////////////////////////////////////////////
class PlayerStats extends React.Component {

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

    });

    return (
      <div className={myClasses}>
        <div className="tbl">

          <div className="tbl-row">
            <div className="tbl-cell">
              Player Health
            </div>
            <div className="tbl-cell">
              Player Level
            </div>
            <div className="tbl-cell">
              Weapon Level
            </div>
            <div className="tbl-cell">
              Damage Potential
            </div>
          </div>

          <div className="tbl-row">
            <div className="tbl-cell">
              {this.props.playerHealth}/{this.props.playerHealthMax}
            </div>
            <div className="tbl-cell">
              {this.props.playerLevel}
            </div>
            <div className="tbl-cell">
              {this.props.weaponLevel}
            </div>
            <div className="tbl-cell">
              {this.props.damage}
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default PlayerStats;
