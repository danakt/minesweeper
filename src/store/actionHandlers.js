import createMineField from '../utils/createMineField'
import updateMatrixValue from '../utils/updateMatrixValue'
import showEmptyCellsAround from '../utils/showEmptyCellsAround'
import { OPENED, CLOSED, FLAGGED, EXPLODED } from '../const/states'
import { MINE, EMPTY } from '../const/cells'
import { WAITING, PLAYING, WIN, LOSS } from '../const/gameStates'

/**
 * Initialization the minefield
 */
export function init(state) {
  return {
    ...state,
    minefield: createMineField(state.width, state.height, state.mines),
    statemap: Array(state.width).fill(undefined).map(column => new Uint8Array(state.height)),
    gameState: WAITING,
  }
}

/**
 * Makes map with empty cell by specified coordinates
 * That needs for first move
 */
export function makeMapByPoint(state, action) {
  const { x, y } = action.payload

  let minefield
  // Making finite loop to prevent unexpected behavior
  for (let i = 0; i <= 1e6; i++) {
    if (i === 1e6) {
      throw new Error('Error generating map')
    }

    minefield = createMineField(state.width, state.height, state.mines)
    if (minefield[x][y] === EMPTY) {
      break
    }
  }

  return {
    ...state,
    minefield
  }
}

/**
 * Open cell
 */
export function openCell(state, action) {
  // If game is not playing, return
  if (state.gameState !== WAITING && state.gameState !== PLAYING) {
    return state
  }

  const { x, y } = action.payload
  const cellState = state.statemap[x][y]

  // If cell is alredy opeend of flagged, do nothing
  if (cellState === OPENED || cellState === FLAGGED) {
    return state
  }

  // Switching cell type
  switch (state.minefield[x][y]) {
    // Open empty cells
    case EMPTY: {
      const statemap = showEmptyCellsAround(x, y, state.minefield, state.statemap)

      return {
        ...state,
        statemap,
        gameState: PLAYING,
      }
    }

    // If is mine, showing
    case MINE: {
      // Open all mines
      const statemapWithOpenedMines = state.statemap.map((column, x) => {
        return column.map((item, y) => {
          return state.minefield[x][y] === MINE
            ? OPENED
            : item
        })
      })

      // Mark exploded mine
      const newStatemap = updateMatrixValue(EXPLODED, x, y, statemapWithOpenedMines)

      return {
        ...state,
        statemap: newStatemap,
        gameState: LOSS,
      }
    }

    // If is number, just open the cell
    default: {
      const newStatemap = updateMatrixValue(OPENED, x, y, state.statemap)
      return {
        ...state,
        statemap: newStatemap,
        gameState: PLAYING,
      }
    }
  }
}

/**
 * Starting the game
 */
export function start(state, action) {
  return {
    ...state,
    isPlaying: true,
  }
}


/**
 * Resize the minefield
 */
export function resize(state, action) {
  return {
    ...state,
    width: action.payload.width,
    height: action.payload.heigth,
  }
}

/**
 * Set mines number
 */
export function setMines(state, action) {
  return {
    ...state,
    mines: action.payload.mines,
  }
}

/**
 * Toggle flag
 */
export function toggleFlag(state, action) {
  if (state.gameState !== WAITING && state.gameState !== PLAYING) {
    return state
  }

  const { x, y } = action.payload
  const currentCellState = state.statemap[x][y]

  if (currentCellState !== CLOSED && currentCellState !== FLAGGED) {
    return state
  }

  const nextCellState = currentCellState === CLOSED
    ? FLAGGED
    : CLOSED

  return {
    ...state,
    statemap: updateMatrixValue(nextCellState, x, y, state.statemap)
  }
}