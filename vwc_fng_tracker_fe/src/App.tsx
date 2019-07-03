import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, Lock, LockOpen } from '@material-ui/icons'
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
        <AppBar color="primary" position="static">
          <Toolbar>
            <List component="nav">
              <ListItem component="div">
                <ListItemText inset>
                  <TypoGraphy
                    variant="subtitle1"
                    color="inherit">
                    { `${process.env.REACT_APP_WEBSITE_NAME}`}
                    </TypoGraphy>
                  </ListItemText>
                  <ListItemText inset
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'home')}>
                      <TypoGraphy color="inherit" variant="subtitle1">
                        <Home />
                      </TypoGraphy>
                  </ListItemText>
            {
              !isAuthenticated() && (
                  <ListItemText inset
                    id="qsLoginBtn"
                    className="btn-margin"
                    onClick={this.login.bind(this)}>
                    <TypoGraphy color="inherit" variant="subtitle1">
                      <LockOpen />
                    </TypoGraphy>
                  </ListItemText>
                )
            }
            {
              isAuthenticated() && (
                  <ListItemText inset
                    id="qsLogoutBtn"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}>
                    <TypoGraphy color="inherit" variant="subtitle1">
                      <Lock />
                    </TypoGraphy>
                  </ListItemText>
                )
            }
            </ListItem>
            </List>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default App;
