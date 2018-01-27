import React, { Component } from 'react'
import './styles.css'
import { EMPTY, MINE } from '../../const/cells'

export default class Item extends Component {
  render() {
    const item = this.props.type === MINE
      ? '💣'
      : this.props.type === EMPTY
        ? ''
        : this.props.type

    return (
      <div className="item">
        <span className="content">
          {item}
        </span>
      </div>
    )
  }
}
