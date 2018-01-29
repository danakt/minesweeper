import declOfNum from '../declOfNum'

test('Declination', () => {
  const decl = n => declOfNum(n, ['тест', 'теста', 'тестов'])
  expect(decl(0)).toEqual('тестов')
  expect(decl(1)).toEqual('тест')
  expect(decl(32)).toEqual('теста')
  expect(decl(100500)).toEqual('тестов')
})
