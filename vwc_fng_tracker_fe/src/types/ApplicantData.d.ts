import { IApplicantData } from '../interfaces/IApplicantData'
import { AccountData } from '../types/AccountData'

export class ApplicantData implements IApplicantData {
  firstName: string
  lastName: string
  email: string
  accounts? : [AccountData]
}

