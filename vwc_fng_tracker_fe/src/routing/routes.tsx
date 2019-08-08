import React from 'react'
import { Route, Router } from 'react-router-dom'
import { App } from '../App'
import {
  Home,
  ApplicantPage,
  ApplicantList,
  ApplicantForm
} from '../components'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import history from '../services/history'

export const makeMainRoutes = () => {
  return (
    <Router history={history} >
      <Route path="/" render={ (props) => {
        return (<App {...props} />)
      }} />
      <Route path="/home" render={ (props) => {
        return (<Home {...props} />)
      }} />
      <Route path="/applicants" render={ (props) => {
        return (<ApplicantList />)
      }} />
      <Route exact path="/applicant/new" render={ (props) => {
        return (<MuiPickersUtilsProvider utils={MomentUtils}>
          <ApplicantForm  {...props} />
        </MuiPickersUtilsProvider>)
      }} />
    <Route exact path="/applicant/edit/:uid" render={ (props) => {
      return (<MuiPickersUtilsProvider utils={MomentUtils}>
        <ApplicantForm  {...props} />
        </MuiPickersUtilsProvider>)
      }} />
    <Route exact path="/applicant/show/:uid" render={ (props) => {
      return (
        <ApplicantPage {...props} />
        )
      }} />
    </Router>
  )
}

