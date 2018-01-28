import pipe from '../pipe'

test('Pipeline function', () => {
  const result = pipe(
    s => s.toLowerCase(),
    s => s.split('').reverse().join(''),
    s => s + '!'
  )('Time')

  expect(result).toEqual('emit!')
})
