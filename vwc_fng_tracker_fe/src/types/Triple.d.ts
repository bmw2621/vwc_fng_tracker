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

  parseObj(): string {
    console.log(this.obj)
    const split = this.obj.split('')
    if(split[0] === '<' && split[split.length - 1] === '>') {
      return this.obj
    } else {
      return `"${this.obj}"`
    }
  }

  toString(): string {
    const obj = this.parseObj()
    return `${this.subj} ${this.pred} ${obj} .`
  }
}
