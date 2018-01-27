import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'
import Item from '../Item'

class Minesweeper extends Component {
  render() {
    return (
      <div className="minefield">
        {this.props.minefield.map((column, x) => (
          <div className="column" key={'column_' + x}>
            {Array.from(column).map((item, y) => (
              <Item key={'item_' + y}
                type={item}
                itemState={this.props.statemap[x][y]} />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  minefield: state.minefield,
  statemap: state.statemap,
})

export default connect(mapStateToProps)(Minesweeper)
