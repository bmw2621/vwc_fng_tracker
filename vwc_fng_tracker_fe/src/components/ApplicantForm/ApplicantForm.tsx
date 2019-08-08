import React, { useEffect } from 'react'
import { useGlobal } from '../../store'
import { useForm } from '../../hooks'
import { withRouter } from 'react-router'
import { DatePicker } from '../DatePicker'
import { Button, Grid, FormControlLabel, Switch, TextField  } from '@material-ui/core'

import moment from 'moment'

const ApplicantFrm = (props) => {
  const [globalState, globalActions] = useGlobal()

  const save = () => {
    console.log(values)
  }

  const {
    handleChange,
    handleDateChange,
    handleSubmit,
    values
  } = useForm(save, globalState, 'selectedApplicant', globalActions)

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Editing Applicant:</h3>
            <hr />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <form onSubmit={ handleSubmit }>
              <input type="hidden" name="uid" value={ values.uid || '_:a' } />
              <TextField
                required
                id="firstName"
                label="First Name"
                margin="normal"
                variant="outlined"
                value={ values.firstName || '' }
                onChange={ handleChange }
              />
              &nbsp;
              <TextField
                required
                id="lastName"
                label="Last Name"
                margin="normal"
                variant="outlined"
                value={ values.lastName || '' }
                onChange={ handleChange }
              />
              <br />
              <TextField
                required
                id="email"
                label="Email"
                margin="normal"
                variant="outlined"
                autoComplete="email"
                value={ values.email || '' }
                onChange={ handleChange }
              />
              &nbsp;
              <DatePicker
                hiddenLabel="dateJoined"
                id="dateJoined"
                label="Date Joined"
                margin="normal"
                variant="inline"
                inputVariant="outlined"
                format="MM/DD/YYYY"
                value={ values.dateJoined }
                changeHandler={ handleChange }
              />
              <br />
              <TextField
                id="phoneNumber"
                label="Phone number"
                margin="normal"
                variant="outlined"
                value={ values.phoneNumber || '' }
                onChange={ handleChange }
              />
              <br />
              <FormControlLabel
                control={
                  <Switch
                    onChange={ handleChange }
                    value={ values.active || true } />
                }
                label="Active"
              />
              <br />
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button> &nbsp;&nbsp;
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export const ApplicantForm = withRouter(ApplicantFrm)
