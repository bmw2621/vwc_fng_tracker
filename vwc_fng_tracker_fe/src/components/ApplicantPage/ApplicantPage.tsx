import React, { Component } from 'react'
import { getApplicant } from '../../queries/getApplicant'
import { runQuery } from '../../helpers/runQuery'

export class ApplicantPage extends Component<any> {
  constructor(props) {
  super(props)
    this.state = {
      applicantLoaded: false,
      applicant: {}
    }
  }

  componentDidMount() {
    const query = getApplicant(this.state['applicant']['uid'])

    runQuery(query)
      .then(res => res.json())
      .then((json) => {
        const applicant = json.data.applicant
        this.setState({ applicant : applicant, applicantLoaded: true })
      })
      .catch(err => err)
  }

  render() {
    return(
      <div className="Applicant">
      </div>
    )
  }
}
