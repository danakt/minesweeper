import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import { WIN, LOSS } from '../../const/gameStates';
import Timer from '../Timer';

class Scoreboard extends Component {
  render() {
    const minesLeft = this.props.mines - this.props.flags;

    return (
      <div className="scoreboard">
        <div className="mines">
          {minesLeft} {/* declOfNum(minesLeft, ['бомба', 'бомбы', 'бомб']) */}
        </div>

        <div className="status" onClick={this.startGame}>
          {this.getEmojiByGameState(this.props.gameState, this.props.isHold)}
        </div>

        <div className="time">
          <Timer gameState={this.props.gameState} />
        </div>
      </div>
    );
  }

  /**
   * Returns the emoji from the game state
   * @param {number} gameState State of the game
   * @param {boolean} isHold Flag of holding mouse button on some cell
   * @return {string}
   */
  getEmojiByGameState = (gameState, isHold) => {
    if (isHold) {
      return '😲';
    }

    switch (gameState) {
      case WIN:
        return '😎';
      case LOSS:
        return '😵';
      default:
        return '🙂'; // WAITING and PLAYING
    }
  };

  /**
   * Starts/restarts the game
   */
  startGame = () => {
    this.props.dispatch({
      type: 'INIT'
    });
  };
}

export default connect()(Scoreboard);
