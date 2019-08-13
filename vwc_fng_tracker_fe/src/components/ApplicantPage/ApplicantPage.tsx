import React, { useEffect } from 'react'
import { Grid, Button, Chip } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GithubCalendar from 'github-calendar'
import 'github-calendar/dist/github-calendar-responsive.css'
import { useGlobal } from '../../store'
import { withRouter } from 'react-router'

const ApplicantPg = (props) => {
  const [globalState, globalActions] = useGlobal()

  const { selectedApplicant, selectedApplicantLoaded } =
    globalState
  const handleEdit = () => {
    globalActions
      .setState({selectedApplicantLoaded: false})
    globalActions
      .navigate(`/applicant/edit/${props.match.params.uid}`)
  }

  const ghCal =
    () => new GithubCalendar(`.calendar-${props.match.params.uid}`, 'eprislac')

  const accounts = selectedApplicant.accounts || []

  const accountsList = () => {
    return accounts
      .map((account, index) => {
        return(
          <li key={`account-${index}`}>
            <Chip
              label={account.name}
              color="primary"
              icon={<FontAwesomeIcon icon={['fab', account.type]} size="lg" ></FontAwesomeIcon>}
              onDelete={() => null}
              onClick={() => null}
              clickable />
          </li>
        )
      })
  }

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
          <Grid item xs={11}>
            <h3>Applicant: {selectedApplicant.firstName} {selectedApplicant.lastName}</h3>
          </Grid>
          <Grid item xs={1}>
            <br />
            <Button color="default" size="small" onClick={handleEdit}>Edit</Button>
          </Grid>
          <Grid item xs={12}><hr /></Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FontAwesomeIcon icon="envelope" ></FontAwesomeIcon> <strong>Email: </strong> <a href={`mailto:${selectedApplicant.email}`}>{selectedApplicant.email}</a> <br /><br />
            <FontAwesomeIcon icon="phone-alt" ></FontAwesomeIcon> <strong>Phone: </strong><a href={`tel:${selectedApplicant.phoneNumber}`}>{selectedApplicant.phoneNumber}</a> <br /> <br />
            <FontAwesomeIcon icon="calendar-alt" ></FontAwesomeIcon> <strong>Joined: </strong> {new Date(selectedApplicant.dateJoined).toLocaleDateString()} <br /> <br />
            <strong>Active: </strong> {`${selectedApplicant.active}`}<br /> <br />
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
