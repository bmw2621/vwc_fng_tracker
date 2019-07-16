import { applicantsQuery, applicantQuery } from '../queries'
import { applicantMutation } from '../mutations'
import { runQuery } from '../helpers'

export const fetchApplicants = async (store) => {
  store.setState({applicantsListStatus: 'LOADING'})
  const response = await runQuery(applicantsQuery())
    .then(res => res.json())
    .then(json => json.data)
    .catch(err => err.message)
  const applicants = response
    .applicants
    .map(appl => Object.assign(appl, { uid: appl.uuid }))
  store.setState({
    applicants: applicants,
    applicantsListStatus: 'LOADED',
    applicantsLoaded: true
  })
}

export const fetchApplicant = async (store, uid) => {
  store.setState({selectedApplicantStatus: 'LOADING'})
  const response = await runQuery(applicantQuery(uid))
    .then(res => res.json())
    .then(json => json.data)
    .catch(err => err.message)
  const applicant = response.applicant[0]
  store.setState({
    selectedApplicant: applicant,
    selectedApplicantStatus: 'LOADED',
    selectedApplicantLoaded: true
  })
}

export const saveSelectedApplicant = (store, values) => {
  const applicant = values
  const group = store.state.groups.filter((group) => group.name === 'Applicants')[0]
  const appWGroup = Object.assign(applicant, { groupId: group.uid })
  const response = runQuery(applicantMutation(appWGroup))
    .then(res => res.json)
    .catch(err => err.message)
  return response
}
