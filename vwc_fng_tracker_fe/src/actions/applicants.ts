import { applicantsQuery, applicantQuery } from '../queries'
import { runQuery, runMutation } from '../helpers'

export const fetchApplicants = async (store) => {
  store.setState({applicantsListStatus: 'LOADING'})
  const data = await runQuery(applicantsQuery())
  const applicants = data['applicants'] || []

  store.setState({
    applicants: applicants,
    applicantsListStatus: 'LOADED',
    applicantsLoaded: true
  })
}

export const fetchApplicant = async (store, uid) => {
  store.setState({selectedApplicantStatus: 'LOADING'})
  const data = await runQuery(applicantQuery(uid))
  const applicant = data['applicant'][0] || {}
  store.setState({
    selectedApplicant: applicant,
    selectedApplicantStatus: 'LOADED',
    selectedApplicantLoaded: true
  })
}

export const saveSelectedApplicant = (store) => {
  const applicant = store.state.selectedApplicant
  if(!applicant.uid) {
    applicant.uid = '_:a'
    applicant.personType = 'applicant'
  }
  delete applicant['accounts']
  runMutation(applicant)
}
