import { Triple } from './Triple.d'

describe('Triple', () => {
  describe('new', () => {
    const subj: string = '<thing1>'
    const pred: string = '<thing2>'
    const obj = 5
    const trip: Triple = new Triple(subj, pred, obj)

    it ('has a constructor that creates a new Triple', () => {
      expect(trip instanceof Triple).toBe(true)
    })
  })

  describe('toString', () => {
    const subj: string = '<thing1>'
    const pred: string = '<thing2>'
    const obj = 5
    const expected: string = `${subj} ${pred} ${obj} .`
    const trip: Triple = new Triple(subj, pred, obj)

    it('returns a properly formatted string', () => {
      expect(trip.toString()).toEqual(expected)
    })
  })
})
