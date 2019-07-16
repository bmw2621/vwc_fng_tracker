import { Triple } from '../types'
export const buildMutation = (triples:Triple[]): string => {
  const buildTriples = (triples:Triple[]): string => {
    return triples
      .reduce((acc, curr) => {
        return `${acc}${curr.toString()}\n`
      }, ``)
  }

  return `{
    set {

${ buildTriples(triples) }
    }
  }`
}
