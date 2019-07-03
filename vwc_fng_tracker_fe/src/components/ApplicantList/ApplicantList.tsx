import React from 'react'
import { runQuery } from '../../helpers/runQuery'
import { ApplicantData } from '../../types/ApplicantData'
import { getApplicantsList } from '../../queries/ApplicantsList'
import { ApplicantListItem } from '../ApplicantListItem/ApplicantListItem'
import { Grid, Paper, Typography } from "@material-ui/core"
import TypoGraphy from '@material-ui/core/Typography'

export class ApplicantList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      applicantsLoaded: false,
      applicants: []
    }
  }

  componentDidMount() {
    const query = getApplicantsList()

    runQuery(query)
      .then(res => res.json())
      .then((json) => {
        const applicants = json.data.applicants
        this.setState({ applicants: applicants, applicantLoaded: true })
      })
      .catch(err => err)
  }

  render() {
    const listItems = this.state['applicants'].map(applicant => {
      return (
        <Grid item key={applicant.uid}>
          <ApplicantListItem uid={applicant.uid} firstName={applicant.firstName} lastName={applicant.lastName} email={applicant.email}></ApplicantListItem>
				</Grid>
        )
    })
    return(
      <div className="ApplicantList">

          <TypoGraphy variant="h5" color="inherit">Applicants</TypoGraphy>
        { listItems }
      </div>
    )
  }
}

