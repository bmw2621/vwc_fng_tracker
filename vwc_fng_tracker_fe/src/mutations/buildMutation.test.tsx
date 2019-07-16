import { Triple } from '../types'
import { buildMutation } from './'

describe('buildMutation', () => {
  const expected = `{
    set {

_:applicants <applicant> _:a .
_:a <firstName> Joe .
_:a <lastName> Blow .
_:a <email> joeblow@email.com .

    }
  }`

  const triples = [
    new Triple('_:applicants', '<applicant>', '_:a'),
    new Triple('_:a', '<firstName>', 'Joe'),
    new Triple('_:a', '<lastName>', 'Blow'),
    new Triple('_:a', '<email>', 'joeblow@email.com')
  ]

  it('takes an array of Triples and outputs a mutation script', () => {
    expect(buildMutation(triples)).toEqual(expected)
  })
})
