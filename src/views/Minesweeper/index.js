import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { WAITING } from '../../const/gameStates';
import Cell from '../Cell';

class Minesweeper extends Component {
  render() {
    return (
      <div className="minefield">
        {this.props.minefield.map((column, x) => (
          <div className="column" key={'column_' + x}>
            {Array.from(column).map((item, y) => (
              <Cell
                key={'item_' + y}
                type={item}
                itemState={this.props.statemap[x][y]}
                onItemClick={this.openTheCell(x, y)}
                onItemRightClick={this.onItemRightClick(x, y)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  /**
   * Handles item click
   */
  openTheCell = (x, y) => event => {
    // Generate map with empty cell by specified coordinates
    if (this.props.gameState === WAITING) {
      this.props.dispatch({
        type: 'MAKE_MAP_BY_POINT',
        payload: { x, y }
      });
    }

    this.props.dispatch({
      type: 'OPEN_CELL',
      payload: { x, y }
    });
  };

  /**
   * Handles item right click
   */
  onItemRightClick = (x, y) => event => {
    this.props.dispatch({
      type: 'TOGGLE_FLAG',
      payload: { x, y }
    });
  };
}

export default connect()(Minesweeper);
