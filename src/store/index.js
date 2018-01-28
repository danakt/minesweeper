import { createStore } from 'redux'
import { handleActions } from 'redux-actions'
import * as actionHandlers from './actionHandlers'
import { WAITING } from '../const/gameStates'

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
  // State of the game
  gameState: WAITING,
})


/** The store of application */
export default createStore((state = initialState, action) => {
  return handleActions({
    'INIT': actionHandlers.init,
    'MAKE_MAP_BY_POINT': actionHandlers.makeMapByPoint,
    'OPEN_CELL': actionHandlers.openCell,
    'START': actionHandlers.start,
    'RESIZE': actionHandlers.resize,
    'SET_MINES': actionHandlers.setMines,
    'TOGGLE_FLAG': actionHandlers.toggleFlag,
  }, state)(state, action)
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
