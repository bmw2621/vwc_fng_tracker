import React from 'react'
import { Route, Router } from 'react-router-dom'
import { App } from '../App'
import {
  Home,
  ApplicantPage,
  ApplicantList,
  ApplicantForm
} from '../components'
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
      <Route exact path="/applicant/:uid/edit" render={ (props) => {
        return (<ApplicantForm  {...props} />)
      }} />
      <Route exact path="/applicant/:uid" render={ (props) => {
        return (<ApplicantPage {...props} />)
      }} />
      <Route path="/applicant/new" render={ (props) => {
        return (<ApplicantForm  {...props} />)
      }} />

    </Router>
  )
}

