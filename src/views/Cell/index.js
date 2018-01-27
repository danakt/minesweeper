import React, { Component } from 'react'
import classNames from 'classnames'
import './styles.css'
import { EMPTY, MINE } from '../../const/cells'
import { CLOSED, OPENED, SUSPICIOUS, EXPLODED } from '../../const/states'

export default class Cell extends Component {
  render() {
    const content = this.getItemContentByType(this.props.type)
    const classList = classNames('item', this.getClassNameByState(this.props.itemState))

    return (
      <div className={classList} onClick={this.props.onItemClick}>
        <span className="item__content">
          {content}
        </span>
      </div>
    )
  }

  /**
   * Creates a content for the item
   * @return {string}
   */
  getItemContentByType(type) {
    switch (type) {
      case MINE: return '💣'
      case EMPTY: return ''
      // As fallback returns numbers
      default: return type
    }
  }

  /**
   * Returns the classname by state
   * @return {string}
   */
  getClassNameByState(itemState) {
    const prefix = 'item--'

    switch (itemState) {
      case OPENED: return prefix + 'opened'
      case SUSPICIOUS: return prefix + 'suspicious'
      case EXPLODED: return prefix + 'exploded'
      case CLOSED: return prefix + 'closed'
      // Fallback is CLOSED
      default: return prefix + 'closed'
    }
  }
}
