import React, { Component } from 'react'
import { WAITING, WIN, LOSS, PLAYING } from '../../const/gameStates'

export default class Timer extends Component {
  state = {
    timeStart: 0,
    time: 0
  }

  componentWillReceiveProps(nextProps) {
    const curGameState = this.props.gameState
    const nextGameState = nextProps.gameState

    if (curGameState !== WAITING && nextGameState === WAITING) {
      // Ending the timer
      clearInterval(this.interval)
      // Waiting
      this.setState({
        timeStart: 0,
        time: 0
      })
    } else if (curGameState !== PLAYING && nextGameState === PLAYING) {
      // Starting the game
      this.setState({
        timeStart: Date.now(),
        time: 0
      })

      this.interval = setInterval(this.timeUpdate, 10)
    } else if (curGameState !== WIN && curGameState !== LOSS && (nextGameState === WIN || nextGameState === LOSS)) {
      // Ending the timer
      clearInterval(this.interval)

      if (typeof this.props.onTimerEnd === 'function') {
        this.props.onTimerEnd(this.state.time)
      }
    }
  }

  render() {
    return (
      <span>
        {this.getMinutes(this.state.time)}:{this.getSeconds(this.state.time)}
      </span>
    )
  }

  /**
   * Updates the time
   */
  timeUpdate = () => {
    this.setState({
      time: Date.now() - this.state.timeStart
    })
  }

  /**
   * Returns minutes from timestamp
   * @param {number} timestamp
   * @return {number} The minutes
   */
  getMinutes = timestamp => timestamp / 60 / 1e3 | 0

  /**
   * Returns seconds from timestamp
   * @param {number} timestamp
   * @return {string} The seconds to hundredths as string
   */
  getSeconds = timestamp => ((timestamp % (1000 * 60)) / 1000).toFixed(2)
}
