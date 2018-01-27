import updateMatrixValue from '../updateMatrixValue'

test('Immutable updating of 2d matrix', () => {
  const x = 0
  const y = 0

  const oldMatrix = Array(10).fill(undefined).map(column => new Uint8Array(10))
  const newMatrix = updateMatrixValue(1, x, y, oldMatrix)

  expect(oldMatrix).not.toEqual(newMatrix)
  expect(oldMatrix[x]).not.toEqual(newMatrix[x])
  expect(oldMatrix[x][y]).not.toEqual(newMatrix[x][y])
})
