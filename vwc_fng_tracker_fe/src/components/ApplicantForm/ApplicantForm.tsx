import React, { useEffect } from 'react'
import { useGlobal } from '../../store'
import { useForm } from '../../hooks'
import { withRouter } from 'react-router'
import { DatePicker } from '../DatePicker'
import {
  Button,
  Grid,
  FormControlLabel,
  Switch,
  TextField
} from '@material-ui/core'
import { PhoneInput } from '../PhoneInput'

const ApplicantFrm = (props) => {
  const [globalState, globalActions] = useGlobal()

  const save = () => {
    globalActions.fetchGroups()
    .then(() => {
      globalActions.saveSelectedApplicant()
    })
  }

  const {
    handleChange,
    handleSubmit,
    values
  } = useForm(save, globalState, 'selectedApplicant', globalActions)

  const { selectedApplicantLoaded } = globalState

  useEffect(() => {
    if(props.match.params.uid && !selectedApplicantLoaded) {
      globalActions.fetchApplicant(props.match.params.uid)
    }
  })

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
                value={ values.firstName || '' }
                onChange={ handleChange }
              />
              &nbsp;
              <TextField
                required
                id="lastName"
                label="Last Name"
                margin="normal"
                value={ values.lastName || '' }
                onChange={ handleChange }
              />
              <br />
              <TextField
                required
                id="email"
                label="Email"
                margin="normal"
                autoComplete="email"
                value={ values.email || '' }
                onChange={ handleChange }
              />
              &nbsp;
              <DatePicker
                hiddenlabel="dateJoined"
                id="dateJoined"
                label="Date Joined"
                margin="normal"
                variant="inline"
                format="MM/DD/YYYY"
                value={ values.dateJoined }
                changeHandler={ handleChange }
              />
              <br />
              <PhoneInput
                id="phoneNumber"
                labelText="Phone Number"
                onChange={ handleChange }
                value={ values.phoneNumber || '0000000000'  }
              />
              <br />
              <FormControlLabel
                control={
                  <Switch
                    id="active"
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
// <!-- TextField
              //   id="phoneNumber"
              //   label="Phone number"
              //   margin="normal"
              //   variant="outlined"
              //   value={ values.phoneNumber || '' }
              //   onChange={ handleChange }
              // / -->
