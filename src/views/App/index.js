import React, { Component } from 'react';
import { connect } from 'react-redux';
import Minesweeper from '../Minesweeper';
import Scoreboard from '../Scoreboard';
import './styles.css';

class App extends Component {
  render() {
    const { minefield, statemap, gameState, mines, flags } = this.props;

    return (
      <div className="app">
        <div className="minefield-wrapper">
          <Scoreboard gameState={gameState} mines={mines} flags={flags} />

          <Minesweeper
            minefield={minefield}
            statemap={statemap}
            gameState={gameState}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  minefield: state.minefield,
  statemap: state.statemap,
  gameState: state.gameState,
  mines: state.mines,
  flags: state.flags
});

export default connect(mapStateToProps)(App);
