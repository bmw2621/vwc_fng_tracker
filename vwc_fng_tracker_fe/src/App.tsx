import React from 'react';
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const App = () => {
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
             </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );

}
const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
App.propTypes = {
  props: PropTypes.object
}
