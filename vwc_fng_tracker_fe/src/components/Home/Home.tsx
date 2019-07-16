import React, { Component } from 'react';
// import { ApplicantList } from '../ApplicantList/ApplicantList'

export class Home extends Component<any> {
  login() {
    this.props.auth.login();
  }

	goTo(route: string) {
    this.props.history.replace(`/${route}`);
  }

  render() {

    return (
      <div className="Home" style={{ marginTop:20, padding: 30 }}>
				Home

      </div>
    );
  }
}
