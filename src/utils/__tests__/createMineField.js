import createMineField from '../createMineField'
import { MINE, EMPTY } from '../../const/cells'

/**
 * @todo Make testing of calculating of cells around mines
 */
test('Generation of minefield', () => {
  const width = 9
  const height = 9
  const mines = 10

  let minesCounter = 0
  const mineFileld = createMineField(width, height, mines)

  for (let x = 0; x < mineFileld.length; x++) {
    for (let y = 0; y < mineFileld[x].length; y++) {
      if (mineFileld[x][y] === MINE) {
        minesCounter++
      }
    }
  }

  expect(minesCounter).toEqual(mines)
})
