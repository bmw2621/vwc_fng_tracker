import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';
import './App.css';

interface IProps {

}

interface IState {

}

class App extends Component<any> {
  goTo(route: string) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if(localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  public render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <div className="Navbar">
          <div className="Header">
            <div className="Brand">
              <a href="#">{ process.env.REACT_APP_WEBSITE_NAME }</a>
            </div>
            <button
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </button>
            {
              !isAuthenticated() && (
                  <button
                    id="qsLoginBtn"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </button>
                )
            }
            {
              isAuthenticated() && (
                  <button
                    id="qsLogoutBtn"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </button>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
