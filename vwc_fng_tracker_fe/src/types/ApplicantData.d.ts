import { IApplicantData } from '../interfaces/IApplicantData'
import { AccountData } from '../types/AccountData'

export class ApplicantData implements IApplicantData {
  uid?: string
  firstName: string
  lastName: string
  email: string
  active: boolean
  phoneNumber?: string
  dateJoined?: date
  accounts? : [AccountData]
  groupId?: string
}
