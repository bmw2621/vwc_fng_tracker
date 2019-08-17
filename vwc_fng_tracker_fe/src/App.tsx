import React from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import './App.css'
import {AppBar, Button, Toolbar} from '@material-ui/core'
import TypoGraphy from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useGlobal } from './store'


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


export const App = () => {
  const classes = useStyles()
  const [_globalState, globalActions] = useGlobal()
  const goTo = (url) => {
    globalActions.navigate(url)
  }

  const handleApplicantClick = () => {
    goTo('/applicants')
  }

  const handleDashboardClick = () => {
    goTo('/dashboard')
  }
  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar  variant="dense">
          <TypoGraphy
            variant="h6"
            className={classes.title}>
            { `${process.env.REACT_APP_WEBSITE_NAME}`}
            </TypoGraphy>
          [<Button color="inherit">DASHBOARD</Button>]&nbsp;
          [<Button color="inherit" onClick={handleApplicantClick}>APPLICANTS</Button>]
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
