import React, { useEffect } from 'react'
import { useGlobal } from '../../store'
import { useForm } from '../../hooks'
import { withRouter } from 'react-router'
import { DatePicker } from '../DatePicker'
import {
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  Input,
  InputLabel
} from '@material-ui/core'
import MaskedInput from 'react-text-mask'
import moment from 'moment'

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

  const {selectedApplicant, selectedApplicantLoaded} = globalState

  const phoneRef: any = React.createRef()
  const phoneTextMaskRender = (props, ref) => {
        return (
      <MaskedInput
        { ...props }
        ref={ ref }
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
        id={props.id}
        value={values.phoneNumber || '(1  )    -    '}
        onChange={ props.onChange }
      />
    )
  }
  const PhoneTextMask = React.forwardRef(phoneTextMaskRender)

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
              <FormControl>
                <InputLabel htmlFor="phoneNumber">
                  Phone Number
                </InputLabel>
                <Input
                  inputComponent={ PhoneTextMask as any }
                  ref={phoneRef}
                  id="phoneNumber"
                  onChange={ handleChange }
                  value={values.phoneNumber || '(1  )    -    '}
                />
              </FormControl>
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
