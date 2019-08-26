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
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

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
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h3>Editing Applicant:</h3>
              <hr />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                <br /><br />
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

              </form>
            </Grid>
            <Grid xs={ 12 } style={{textAlign: 'right'}}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button> &nbsp;&nbsp;
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export const ApplicantForm = withRouter(ApplicantFrm)

