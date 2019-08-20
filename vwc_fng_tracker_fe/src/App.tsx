import React from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import './App.css'
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
  NavBar,
  ApplicantPage,
  ApplicantList,
  ApplicantForm,
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
      <Route path="/" render={ (props) => {
        return (<NavBar { ...props } user={ user }/>)
      }} />
			<Route path="/applicants" render={ (props) => {
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
    </Router>
  )
}

export const App = (props) => {
  const { loading, user } = useAuth0()
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()

  if (loading || !user) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={classes.root}>
			{ makeMainRoutes(user) }
    </div>
  )
}

App.propTypes = {
  props: PropTypes.object
}
