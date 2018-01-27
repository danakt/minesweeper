import { createStore } from 'redux'
import { handleActions } from 'redux-actions'
import * as actionHandlers from './actionHandlers'

/** Initial state */
const initialState = actionHandlers.init({
  width: 9,
  height: 9,
  mines: 10,
  // The mine field, 2d matrix
  minefield: undefined,
  // The map of states of every item of minefield
  // Empty 2d array on start
  statemap: undefined,
  // Flag of playing start
  isPlaying: false,
})


/** The store of application */
export default createStore((state = initialState, action) => {
  return handleActions({
    'INIT': actionHandlers.init,
    'OPEN_CELL': actionHandlers.openCell,
    'START': actionHandlers.start,
    'RESIZE': actionHandlers.resize,
    'SET_MINES': actionHandlers.setMines
  }, state)(state, action)
})
