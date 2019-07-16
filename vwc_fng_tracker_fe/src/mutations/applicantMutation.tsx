import { Triple, ApplicantData } from '../types'
import { buildMutation } from './buildMutation'

export const applicantMutation = (applicant: ApplicantData):string => {
  const keys:string[] = Object.keys(applicant).filter((key) => key !== 'accounts' && key !== 'groupId')
  const existing:boolean = Object.keys(applicant).includes('uid')
  const identifier = existing ? `<${applicant.uid}>` : '_:a'
  const triples:Triple[] = keys
    .filter(key => key !== 'uid')
    .map(key => new Triple(`${identifier}`, `<${key}>`, `${applicant[key]}`))
  // if(applicant.groupId) {
  //   triples
  //     .push(new Triple(`<${applicant.groupId}>`, '<member>', `${identifier}`))
  // }
  return buildMutation(triples)
}
