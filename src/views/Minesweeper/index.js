import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'
import Item from '../Item'

class Minesweeper extends Component {
  render() {
    return (
      <div className="minefield">
        {this.props.minefield.map((column, i) => (
          <div className="column" key={'column_' + i}>
            {Array.from(column).map((item, j) => (
              <Item type={item} key={'item_' + j} />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  minefield: state.minefield
})

export default connect(mapStateToProps)(Minesweeper)
