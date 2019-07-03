import React, { Component } from 'react';
import { ApplicantList } from '../ApplicantList/ApplicantList'
import { Grid, Paper, Typography } from "@material-ui/core"

export class Home extends Component<any> {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="Home" style={{ marginTop:20, padding: 30 }}>
        <Grid container spacing={10} justify="center">
          {
            isAuthenticated() && (
              <ApplicantList></ApplicantList>
            )
          }
          {
            !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}>
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
          }
        </Grid>
      </div>
    );
  }
}
