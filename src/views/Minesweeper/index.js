import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'
import Cell from '../Cell'

class Minesweeper extends Component {
  render() {
    return (
      <div className="minefield">
        {this.props.minefield.map((column, x) => (
          <div className="column" key={'column_' + x}>
            {Array.from(column).map((item, y) => (
              <Cell key={'item_' + y}
                type={item}
                itemState={this.props.statemap[x][y]}
                onItemClick={this.openTheCell(x, y)} />
            ))}
          </div>
        ))}
      </div>
    )
  }

  /**
   * Handles item click */
  openTheCell = (x, y) => (event) => {
    this.props.dispatch({
      type: 'OPEN_CELL',
      payload: { x, y }
    })
  }
}

const mapStateToProps = (state) => ({
  minefield: state.minefield,
  statemap: state.statemap,
})

export default connect(mapStateToProps)(Minesweeper)
