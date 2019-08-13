import React, { useEffect } from 'react'
import { ApplicantListItem } from '../ApplicantListItem/ApplicantListItem'
import { Chip, Grid } from "@material-ui/core"
import { useGlobal } from '../../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      applicants: [],
      selectedApplicantLoaded: false,
      selectedApplicant: {}
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
      <Grid item xs={7}>
        <h3>Applicants</h3>
      </Grid>
      <Grid item xs={1}>
        <br />
        <Chip
          label="NEW APPLICANT"
          color="primary"
          icon={<FontAwesomeIcon icon="plus-circle" size="lg" ></FontAwesomeIcon>} onClick={() => goTo('applicant/new')}
          clickable />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={12}><hr /></Grid>
      { listItems(applicants, goTo) }
    </Grid>
  )
}


