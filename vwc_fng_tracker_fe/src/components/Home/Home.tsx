import React, { Component } from 'react';
// import { ApplicantList } from '../ApplicantList/ApplicantList'

export const Home = (props) => {
  const login = () => {
    props.auth.login();
  }

  const goTo = (route: string) => {
    props.history.replace(`/${route}`);
  }

  const { isAuthenticated } = props.auth

  return (
    <div className="Home">
      <div className="container">
        {
          isAuthenticated() && (
            <h4>You are logged in!</h4>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a style={{ cursor: 'pointer' }}
                onClick={ login }>
                Log In
              </a>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    </div>
  )
}
