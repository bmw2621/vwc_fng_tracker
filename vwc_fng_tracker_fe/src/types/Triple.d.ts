import {ITriple} from '../interfaces/ITriple'

export class Triple implements ITriple {
  subj: any
  pred: string
  obj: any

  constructor(subj: any, pred: string, obj: any ) {
    this.subj = subj
    this.pred = pred
    this.obj = obj
  }

  toString(): string {
    return `${this.subj} ${this.pred} ${this.obj} .`
  }
}
