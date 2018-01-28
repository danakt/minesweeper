import { EMPTY, MINE } from '../../const/cells'
import { CLOSED, OPENED, FLAGGED } from '../../const/states'
import showEmptyCellsAround from '../showEmptyCellsAround'

/**
 * Normalizes the minefield
 */
function normalizeMinfield(minefield) {
  return minefield.map(column => {
    return column.map(item => {
      switch (item) {
        case 9: return MINE
        case 0: return EMPTY
        default: return item
      }
    })
  })
}

/**
 * Normalizes the statemap
 */
function normalizeStatemap(statemap) {
  return statemap.map(column => {
    return column.map(item => {
      switch (item) {
        case 0: return CLOSED
        case 2: return FLAGGED
        default: return item
      }
    })
  })
}

/**
 * Testing
 */
test('Showing empty cells around', () => {
  const mockMinefield = normalizeMinfield([
    [9, 1, 0, 0, 0, 0, 0, 1, 9],
    [1, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 9, 2, 2, 2, 1],
    [0, 0, 0, 2, 2, 3, 9, 9, 2],
    [0, 0, 0, 1, 9, 2, 2, 3, 9],
    [0, 1, 1, 2, 1, 1, 0, 1, 1],
    [1, 2, 9, 1, 0, 0, 0, 0, 0],
    [2, 9, 2, 1, 0, 0, 0, 0, 0],
    [9, 2, 1, 0, 0, 0, 0, 0, 0],
  ])
  console.log(mockMinefield)

  const mockStatemap = normalizeStatemap([
    [0, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])

  const mockStatemapResult = normalizeStatemap([
    [0, 1, 1, 2, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])

  expect(
    showEmptyCellsAround(0, 4, mockMinefield, mockStatemap)
  ).toEqual(mockStatemapResult)
})
