import React, { useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GithubCalendar from 'github-calendar'
import 'github-calendar/dist/github-calendar-responsive.css'
import { useGlobal } from '../../store'
import { withRouter } from 'react-router'
import { AccountsList } from '../AccountsList'
import { Comments } from '../Comments'
import PropTypes from 'prop-types'

const ApplicantPg = (props) => {
  const [globalState, globalActions] = useGlobal()
  const user = props.user
  const { selectedApplicant, selectedApplicantLoaded } =
    globalState
  const { setState, navigate } = globalActions
  const applicantUid = props.match.params.uid
  const handleEdit = () => {
    setState({selectedApplicantLoaded: false})
    navigate(`/applicant/edit/${applicantUid}`)
  }

  const ghCal =
    () => new GithubCalendar(`.calendar-${applicantUid}`, 'eprislac')

  const accounts = selectedApplicant.accounts || []
  const comments = selectedApplicant.comments || []

  const accountsList = () => {
    return (<AccountsList accounts={ accounts } applicantUid={ applicantUid } />)
  }

  useEffect(() => {
    if(!selectedApplicantLoaded) {
      globalActions.fetchApplicant(applicantUid)
      setState({selectedApplicantLoaded: true})
      ghCal()
    }
  })

  return (
    <Grid container>
      <Grid item xs={3}>&nbsp;</Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <h3>Applicant: {selectedApplicant.firstName} {selectedApplicant.lastName}</h3>
          </Grid>
          <Grid item xs={2} style={{textAlign: 'right'}}>
            <br />
            <Button color="primary" size="small" onClick={handleEdit}>Edit Applicant</Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4} style={{fontSize: 1}}>
            <FontAwesomeIcon icon="envelope" ></FontAwesomeIcon> <strong>Email: </strong> <a href={`mailto:${selectedApplicant.email}`}>{selectedApplicant.email}</a> <br /><br />
            <FontAwesomeIcon icon="phone-alt" ></FontAwesomeIcon> <strong>Phone: </strong><a href={`tel:${selectedApplicant.phoneNumber}`}>{selectedApplicant.phoneNumber}</a> <br /> <br />
            <FontAwesomeIcon icon="calendar-alt" ></FontAwesomeIcon> <strong>Joined: </strong> {new Date(selectedApplicant.dateJoined).toLocaleDateString()} <br /> <br />
            <strong>Active: </strong> {`${selectedApplicant.active}`}<br /> <br />
            { selectedApplicantLoaded && accountsList() }
            </Grid>
            <Grid item xs={8}>
              <Grid item xs={12} className={ `calendar-${applicantUid}` } />
              <Grid item xs={12} className="commentsContainer">
                <Comments comments={ comments } applicantUid={ applicantUid } user={ user } />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>&nbsp;</Grid>
    </Grid>
  )
}

ApplicantPg.propTypes = {
  props: PropTypes.object,
  user: PropTypes.object
}

export const ApplicantPage = withRouter(ApplicantPg)
