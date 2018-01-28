import React, { Component } from 'react'
import classNames from 'classnames'
import './styles.css'
import { EMPTY, MINE } from '../../const/cells'
import { CLOSED, OPENED, SUSPICIOUS, FLAGGED, EXPLODED } from '../../const/states'

export default class Cell extends Component {
  componentDidMount() {
    this.itemElement.addEventListener('contextmenu', this.onRightClick)
  }

  componentWillUnmount() {
    this.itemElement.removeEventListener('contextmenu', this.onRightClick)
  }

  render() {
    const content = this.getItemContentByType(this.props.type)
    const classList = classNames(
      'item',
      this.getClassNameByState(this.props.itemState)
    )

    return (
      <div className={classList} onClick={this.props.onItemClick} ref={el => this.itemElement = el}>
        <span className="item__content">
          {content}
        </span>
      </div>
    )
  }

  /**
   * Handles right click on cell
   */
  onRightClick = (event) => {
    event.preventDefault()

    if (typeof this.props.onItemRightClick === 'function') {
      this.props.onItemRightClick(event)
    }
  }

  /**
   * Creates a content for the item
   * @return {string}
   */
  getItemContentByType = (type) => {
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
  getClassNameByState = (itemState) => {
    const prefix = 'item--'

    switch (itemState) {
      case OPENED: return prefix + 'opened'
      case SUSPICIOUS: return prefix + 'suspicious'
      case EXPLODED: return prefix + 'exploded'
      case CLOSED: return prefix + 'closed'
      case FLAGGED: return prefix + 'closed ' + prefix + 'flagged'
      // Fallback is CLOSED
      default: return prefix + 'closed'
    }
  }
}
