import React, { useEffect } from 'react'
import { Grid, Button, Paper } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GithubCalendar from 'github-calendar'
import 'github-calendar/dist/github-calendar-responsive.css'
import { useGlobal } from '../../store'
import { withRouter } from 'react-router'
import { AccountsList } from '../AccountsList'
import { Comments } from '../Comments'
import { TaskList } from '../Tasks'
import { RatingsList } from '../Ratings'
import PropTypes from 'prop-types'
import { of } from 'rxjs'

const ApplicantPg = (props) => {
  const [globalState, globalActions] = useGlobal()
  const user = props.user
  const {
    selectedApplicant,
    selectedApplicantLoaded,
    taskListTypesLoaded,
    associatedTasks,
  } = globalState
  const {
    setState,
    navigate,
    fetchTaskListTypes,
    fetchApplicant,
    fetchAssociatedTasks,
    addCompletedTask
  } = globalActions
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
    return (
      <AccountsList
        accounts={ accounts }
        applicantUid={ applicantUid } />
    )
  }

  const createTaskList = () => {
    of(fetchAssociatedTasks('applicant'))
      .subscribe((obj) => {
        obj.then(data => setState({associatedTasks: data.taskList}))
      })
  }

  const handleTaskChange = (event, item) => {
    const obj = {
      uid: selectedApplicant.uid,
      hasCompletedTask: {
        uid: '_:uid',
        completed: true,
        dateCompleted: new Date(),
        ...item
      }
    }

    addCompletedTask(obj)
      .then(() => fetchApplicant(selectedApplicant.uid))
  }

  useEffect(() => {
    if(!selectedApplicantLoaded)  {
      fetchApplicant(applicantUid)
      fetchTaskListTypes()
      ghCal()
      setState({selectedApplicantLoaded: true})
      createTaskList()
      if(taskListTypesLoaded) {
        createTaskList()
      }
  }})

  return (
    <Grid container>
      <Grid item xs={2}>&nbsp;</Grid>
      <Grid item xs={8}>
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
            <TaskList
              ownerUid={ selectedApplicant.uid }
              associatedTasks={ associatedTasks || [] }
              completedTasks={ selectedApplicant.completedTasks || []}
              personType={ selectedApplicant.personType }
              handleChange={ handleTaskChange }/>
            <br />
            <RatingsList />
          </Grid>

            <Grid item xs={8} style={{marginTop: 0, paddingTop: 0}}>
              <h3 style={{marginTop: 0, paddingTop: 0}}>Github Traffic</h3>
              <Paper>
                <div className={ `calendar calendar-responsive calendar-${applicantUid}` } />
              </Paper>
              <Grid item xs={12} className="commentsContainer">
                <Comments comments={ comments } applicantUid={ applicantUid } user={ user } />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>&nbsp;</Grid>
    </Grid>
  )
}

ApplicantPg.propTypes = {
  props: PropTypes.object,
  user: PropTypes.object
}

export const ApplicantPage = withRouter(ApplicantPg)
