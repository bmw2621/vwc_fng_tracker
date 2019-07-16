import React, { useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import GithubCalendar from 'github-calendar'
import 'github-calendar/dist/github-calendar-responsive.css'
import { useGlobal } from '../../store'
import { withRouter } from 'react-router'

const ApplicantPg = (props) => {
  const [globalState, globalActions] = useGlobal()

  const { selectedApplicant, selectedApplicantLoaded } = globalState

  // const goTo = (route: string) => {
  //   globalActions.setState({
  //     selectedApplicantLoaded: false,
  //     selectedApplicantStatus: 'EMPTY',
  //     selectedApplicant: {}
  //   })
  //   globalActions.navigate(`/${route}`)
  // }

  const handleEdit = () => {
    globalActions.navigate(`/applicant/${props.match.params.uid}/edit`)
  }

  const ghCal =
    () => new GithubCalendar(`.calendar-${props.match.params.uid}`, 'eprislac')

  const accounts = selectedApplicant.accounts

  const accountsList = () => {
    return accounts
      .map((account, index) => {
        return(
          <li key={`account-${index}`}>
            <strong>{account.type}:</strong> {account.name}
          </li>
        )
      })
  }

  // const githubAcct = () => {
  //   const ghAcct = accounts
  //     .filter((acct) => acct['type'] === 'github')[0]
  //
  //   return ghAcct ? ghAcct['name'] : ''
  // }

  useEffect(() => {
    if(!selectedApplicantLoaded) {
      globalActions.fetchApplicant(props.match.params.uid)
      ghCal()
    }
  })

  return (
    <Grid container>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Applicant: {selectedApplicant.firstName} {selectedApplicant.lastName}</h3>
            <hr />
          </Grid>
          <Grid item xs={11} />
          <Grid item xs={1}>
            <Button color="default" size="small" onClick={handleEdit}>Edit</Button>
          </Grid>
        </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <strong>Email: </strong> {selectedApplicant.email} <br />
              <strong>Active: </strong> {selectedApplicant.active}<br />
              <strong>Accounts</strong>
              <ul>{ selectedApplicantLoaded && accountsList() }</ul>
            </Grid>
            <Grid item xs={8} className={ `calendar-${props.match.params.uid}` }/>
          </Grid>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  )
}

export const ApplicantPage = withRouter(ApplicantPg)
