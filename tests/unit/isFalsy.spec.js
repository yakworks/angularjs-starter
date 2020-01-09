import { isFalsy, isEmpty } from './isFalsy'

describe('isFalsy', () => {
  describe('func: isFalsy', function () {
    it('returns true for `NaN`', () => expect(isFalsy(NaN)))

    it('returns true empty strings', function () {
      expect(isFalsy(''))
      expect(isFalsy('foo'))
    })

    it('returns true for `null`', () => expect(isFalsy(null)))

    it('returns true for `undefined`', () => expect(isFalsy(undefined)))

    it('returns true for `false`', () => expect(isFalsy(false)))

    return it('returns false for other value', function () {
      expect(isFalsy(true)).toBe(false)
      expect(isFalsy(0)).toBe(false)
      expect(isFalsy(0.0)).toBe(false)
      expect(isFalsy(123)).toBe(false)
    })
  })

  describe('func: isEmpty', function () {
    describe('for empty strings', function () {
      [undefined, null, ''].map((str) =>
        it(`returns true for \`${str}\``, () => expect(isEmpty(str)).to.be.true)
      )
    })

    describe('for non empty strings', function () {
      [' ', '    ', 'test', ' foo bar '].map((str) =>
        it(`returns false for \`${str}\``, () => expect(isEmpty(str)).to.be.false)
      )
    })
  })
})
