import React from 'react'
import {AppBar, Button, Toolbar, Grid} from '@material-ui/core'
import TypoGraphy from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useGlobal } from '../../store'
import { useAuth0 } from "../../react-auth0-wrapper"

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

export const NavBar = (props) => {
  const {
	  isAuthenticated,
 	  loginWithPopup,
    logout
  } = useAuth0()

	const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
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
    <AppBar color="primary" position="static">
        <Toolbar  variant="dense">
          <Grid container>
            <Grid item xs={ 3 }>&nbsp;</Grid>
            <Grid item xs={ 4 }>
              <TypoGraphy
                variant="h6"
                className={classes.title}>
                { `${process.env.REACT_APP_WEBSITE_NAME}`}
                </TypoGraphy>
						</Grid>
						<Grid item xs={ 3 }>
              [<Button key={`nbBtn0`} color="inherit">DASHBOARD</Button>]&nbsp;
              [<Button key={`nbBtn1`} color="inherit" onClick={ handleApplicantClick }>APPLICANTS</Button>]
              {
                !isAuthenticated && (
                  [<Button key={`nbBtn2`} color="inherit" onClick={ () => loginWithPopup({}) }>LOG IN</Button>]
                )
              }
              {
                isAuthenticated && (
                  [<Button key={`nbBtn3`} color="inherit" onClick={ () => logout() }>LOG OUT</Button>]
                )
              }
            </Grid>
          	<Grid item xs={ 2 }>&nbsp;</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
	)
}

