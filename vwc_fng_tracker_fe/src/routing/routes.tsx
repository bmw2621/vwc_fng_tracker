import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';
import Callback from '../components/Callback';
import { ApplicantPage } from '../components/ApplicantPage/ApplicantPage';
import Auth from '../services/Auth';
import history from '../services/history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={ (props) => <App auth={auth} {...props} /> } />
        <Route path="/home" render={ (props) => <Home auth={auth} {...props} /> } />
        <Route path="/callback" render={ (props) => {
          handleAuthentication(props);
          return <Callback {...props} />
          }} />
        <Route path="/applicant/:uid" render={ (props) => {
          return <ApplicantPage auth={auth} {...props} />
          }} />
      </div>
    </Router>
  )
}

