import React, { useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GithubCalendar from 'github-calendar'
import 'github-calendar/dist/github-calendar-responsive.css'
import { useGlobal } from '../../store'
import { withRouter } from 'react-router'
import { AccountsList } from '../AccountsList'
import { Comments } from '../Comments'

const ApplicantPg = (props) => {
  const [globalState, globalActions] = useGlobal()

  const { selectedApplicant, selectedApplicantLoaded } =
    globalState
  const applicantUid = props.match.params.uid
  const handleEdit = () => {
    globalActions
      .setState({selectedApplicantLoaded: false})
    globalActions
      .navigate(`/applicant/edit/${applicantUid}`)
  }

  const ghCal =
    () => new GithubCalendar(`.calendar-${applicantUid}`, 'eprislac')

  const accounts = selectedApplicant.accounts || []

  const accountsList = () => {
    return (<AccountsList accounts={ accounts } applicantUid={ applicantUid } />)
  }

  useEffect(() => {
    if(!selectedApplicantLoaded) {
      globalActions.fetchApplicant(applicantUid)
      ghCal()
    }
  })

  return (
    <Grid container>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <h3>Applicant: {selectedApplicant.firstName} {selectedApplicant.lastName}</h3>
          </Grid>
          <Grid item xs={1}>
            <br />
            <Button color="default" size="small" onClick={handleEdit}>Edit</Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FontAwesomeIcon icon="envelope" ></FontAwesomeIcon> <strong>Email: </strong> <a href={`mailto:${selectedApplicant.email}`}>{selectedApplicant.email}</a> <br /><br />
            <FontAwesomeIcon icon="phone-alt" ></FontAwesomeIcon> <strong>Phone: </strong><a href={`tel:${selectedApplicant.phoneNumber}`}>{selectedApplicant.phoneNumber}</a> <br /> <br />
            <FontAwesomeIcon icon="calendar-alt" ></FontAwesomeIcon> <strong>Joined: </strong> {new Date(selectedApplicant.dateJoined).toLocaleDateString()} <br /> <br />
            <strong>Active: </strong> {`${selectedApplicant.active}`}<br /> <br />
            { selectedApplicantLoaded && accountsList() }
          </Grid>
          <Grid item xs={8} className={ `calendar-${applicantUid}` }/>
        </Grid>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  )
}

export const ApplicantPage = withRouter(ApplicantPg)
