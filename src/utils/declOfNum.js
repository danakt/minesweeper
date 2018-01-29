/**
 * Declination of Russian words after numbers
 * @param {number} number The number
 * @param {string[]} variants List of variants
 * @return {string}
 *
 * @code
 * declOfNum(count, ['мина', 'мины', 'мин'])
 */
export default function declOfNum(number, variants) {
  const cases = [2, 0, 1, 1, 1, 2]
  const index = number % 100 > 4 && number % 100 < 20
    ? 2
    : cases[number % 10 < 5 ? number % 10 : 5]

  return variants[index]
}
