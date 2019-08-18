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
            <Grid xs={ 2 }>&nbsp;</Grid>
            <Grid xs={ 5 }>
              <TypoGraphy
                variant="h6"
                className={classes.title}>
                { `${process.env.REACT_APP_WEBSITE_NAME}`}
                </TypoGraphy>
						</Grid>
						<Grid xs={ 3 }>
              [<Button color="inherit">DASHBOARD</Button>]&nbsp;
              [<Button color="inherit" onClick={ handleApplicantClick }>APPLICANTS</Button>]
              {
                !isAuthenticated && (
                  [<Button color="inherit" onClick={ () => loginWithPopup({}) }>LOG IN</Button>]
                )
              }
              {
                isAuthenticated && (
                  [<Button color="inherit" onClick={ () => logout() }>LOG OUT</Button>]
                )
              }
            </Grid>
          	<Grid xs={ 2 }>&nbsp;</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
	)
}

