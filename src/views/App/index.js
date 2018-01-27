import React, { Component } from 'react'
import Minesweeper from '../Minesweeper'
import './styles.css'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="minefield-wrapper">
          <Minesweeper />
        </div>
      </div>
    )
  }
}
