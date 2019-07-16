import React, { Component } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core"
import  TypoGraphy from '@material-ui/core/Typography'
import {ApplicantData} from '../../types/ApplicantData'

export class ApplicantListItem extends Component<any> {
  applicant: ApplicantData

  constructor(props) {
    super(props)
    this.applicant = props.applicant
    this.state = {}
  }

  componentDidMount() {
    this.setState(this.applicant)
  }

  render() {
    return (
          <Card onClick={() => this.props.goToApplicant((`applicant/${this.applicant.uid}`))}>
            <CardActionArea>
              <CardContent>
                <TypoGraphy  variant="body2" component="span">
                <strong>Name: </strong>{this.state['firstName']} {this.state['lastName']}
                </TypoGraphy> <br />
                <TypoGraphy variant="body2" component="span">
                <strong>Email: </strong><a href={`mailto:${this.state['email']}`}>{this.state['email']}</a> <br />
              </TypoGraphy>
              <TypoGraphy variant="body2" component="span">
                <strong>Active: </strong>{`${this.state['active']}`}
              </TypoGraphy>
              </CardContent>
            </CardActionArea>
          </Card>

    )
  }
}
