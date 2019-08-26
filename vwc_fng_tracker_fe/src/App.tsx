import React from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import './App.scss'
import {AppBar, Button, Toolbar, Grid} from '@material-ui/core'
import TypoGraphy from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useGlobal } from './store'
import { useAuth0 } from "./react-auth0-wrapper"
import { Route, Router } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import history from './services/history'
import {
  Home,
  NavBar,
  ApplicantPage,
  ApplicantList,
  ApplicantForm,
  TaskListType,
  TaskListTypeGrid,
  TaskType,
  TaskList,
  Task
} from './components'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

const makeMainRoutes = (user) => {
  return (
    <Router history={ history }  >
      <Route exact path="/" render={ (props) => {
        return (<Home { ...props } user={ user } />)
      }} />
			<Route exact path="/applicants" render={ (props) => {
        return (<ApplicantList { ...props } user={ user } />)
      }} />
      <Route exact path="/applicant/new" render={ (props) => {
        return (<MuiPickersUtilsProvider utils={MomentUtils}>
          <ApplicantForm  { ...props } user={ user } />
        </MuiPickersUtilsProvider>)
      }} />
      <Route exact path="/applicant/edit/:uid" render={ (props) => {
        return (<MuiPickersUtilsProvider utils={ MomentUtils }>
          <ApplicantForm  { ...props } user={ user } />
          </MuiPickersUtilsProvider>)
        }} />
      <Route exact path="/applicant/show/:uid" render={ (props) => {
        return (
          <ApplicantPage { ...props } user={ user } />
        )
      }} />
      <Route exact path="/task-list-types" render={ (props) => {
        return (
          <TaskListType { ...props } user={ user } />
        )
      }} />
    </Router>
  )
}

export const App = (props) => {
  const { loading, user } = useAuth0()
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()

  return (
    <div className={classes.root}>
      <NavBar user={ user || {} }/>
      { loading && (
        <Grid container>
          <Grid item xs={12}>&nbsp;</Grid>
          <Grid xs={3}>&nbsp;</Grid>
          <Grid item style={{textAlign: 'center'}} xs={6}>
            <img
              src="https://d33wubrfki0l68.cloudfront.net/359a0a795a1e113744e8efa61f2ad8ced49a8c47/237e1/static/flag-047465dbe1f353eed264afc41a089c7a.gif"
              alt="#VetsWhoCode Logo"
              className="logo_holder" />
          </Grid>
          <Grid xs={3}>&nbsp;</Grid>
        </Grid>
          ) }
      { !loading && user && makeMainRoutes(user) }
    </div>
  )
}

App.propTypes = {
  props: PropTypes.object
}
