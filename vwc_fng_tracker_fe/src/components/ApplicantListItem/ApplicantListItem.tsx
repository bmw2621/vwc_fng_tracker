import React, { Component } from 'react';
import { Grid, Paper, Typography } from "@material-ui/core";
import TypoGraphy from '@material-ui/core/Typography'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

export class ApplicantListItem extends Component<any> {
  constructor(props) {
    super(props)
    this.state = {
      guid: props.guid,
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email
    }
  }
  render() {
    return (
      <Card>
				<CardActionArea>
					<CardContent>
						<TypoGraphy  variant="body2" component="span">
							<strong>Name: </strong>{this.state['firstName']} {this.state['lastName']}
							</TypoGraphy> <br />
							<TypoGraphy variant="body2" component="span">
							<strong>Email: </strong><a href={`mailto:${this.state['email']}`}>{this.state['email']}</a>
						</TypoGraphy>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">Email</Button>
					<Button size="small" color="primary">Manage</Button>
					<Button size="small" color="primary">Edit</Button>
					<Button size="small" color="primary">Delete</Button>
				</CardActions>
      </Card>

    )
  }
}
