import { isFalsy, isEmpty } from './isFalsy'

describe('isFalsy', () => {
  describe('func: isFalsy', function() {
    it('returns true for `NaN`', () => expect(isFalsy(NaN)).toBe(true))

    it('returns true empty strings', () =>
      expect(isFalsy('')).toBe(true)
    )

    it('returns true foo string', () =>
      expect(isFalsy('foo')).toBe(false)
    )

    it('returns true for `null`', () => expect(isFalsy(null)).toBe(true))

    it('returns true for `undefined`', () => expect(isFalsy(undefined)).toBe(true))

    it('returns true for `false`', () => expect(isFalsy(false)).toBe(true))

    it('returns false for other value', function() {
      expect(isFalsy(true)).toBe(false)
      expect(isFalsy(0)).toBe(false)
      expect(isFalsy(0.0)).toBe(false)
      expect(isFalsy(123)).toBe(false)
    })
  })

  describe('func: isEmpty', function() {
    describe('for empty strings', function() {
      [undefined, null, ''].map((str) =>
        it(`returns true for \`${str}\``, () => expect(isEmpty(str)).toBe(true))
      )
    })

    describe('for non empty strings', function() {
      [' ', '    ', 'test', ' foo bar '].map((str) =>
        it(`returns false for \`${str}\``, () => expect(isEmpty(str)).toBe(false))
      )
    })
  })
})
