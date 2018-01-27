import { createStore } from 'redux'
import createMineField from '../utils/createMineField'

/** @todo Move to some config */
const DEFAULT_WIDTH = 9
const DEFAULT_HEIGHT = 9
const DEFAULT_MINES = 10

/** Initial state */
const initialState = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  mines: DEFAULT_MINES,
  // The mine field
  minefield: createMineField(DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_MINES),
  // The map of states of every item of minefield
  // Empty 2d array on start
  statemap: Array(DEFAULT_WIDTH).fill(undefined).map(column => new Uint8Array(DEFAULT_HEIGHT)),
  // Flag of playing start
  isPlaying: false,
}

/** The store of application */
export default createStore((state = initialState, action) => {
  switch (action.type) {
    // Creating the minefield
    case 'INIT': {
      return {
        ...state,
        minefield: createMineField(state.width, state.height, state.mines),
        statemap: Array(state.width).fill(undefined).map(column => new Uint8Array(state.height)),
        isPlaying: false,
      }
    }

    // Starting the game
    case 'START': {
      return {
        ...state,
        isPlaying: true,
      }
    }

    // Resize the minefield
    case 'RESIZE': {
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.heigth,
      }
    }

    // Set mines number
    case 'SET_MINES': {
      return {
        ...state,
        mines: action.payload.mines,
      }
    }

    // Fallback
    default: {
      return state
    }
  }
})
