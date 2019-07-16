import React, { useEffect } from 'react'
import { ApplicantListItem } from '../ApplicantListItem/ApplicantListItem'
import { Grid } from "@material-ui/core"
import { useGlobal } from '../../store'

const listItems = (applicants, goTo) => {
  return applicants
    .map((applicant, index) => {
      return (
        <Grid container key={`applicant-${applicant.uid}`}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <ApplicantListItem
              applicant={applicant}
              goToApplicant={ goTo } />
          </Grid>
          <Grid item xs={2} />
        </Grid>
       )
    })
}

export const ApplicantList = () => {
  const [globalState, globalActions] = useGlobal()
	const { applicants, applicantsLoaded } = globalState

  const goTo = (route: string) => {
    globalActions.setState({
      applicantsLoaded: false,
      applicantsListStatus: 'EMPTY',
      applicants: []
    })
    globalActions.navigate(`/${route}`);
  }

	useEffect(() => {
		if(!applicantsLoaded) {
      globalActions.fetchApplicants()
    }
	}, [applicants, applicantsLoaded, globalActions])

  return (
    <Grid container>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <h3>Applicants</h3>
        <hr />
      </Grid>
      <Grid item xs={2} />
      { listItems(applicants, goTo) }
    </Grid>
  )
}


