import React, { useEffect } from 'react'
import { useGlobal } from '../../store'
import { withRouter } from 'react-router'
import { Button, Grid, FormControlLabel, Switch, TextField } from '@material-ui/core'

const ApplicantFrm = (props) => {
  const [globalState, globalActions] = useGlobal()

  const {
    selectedApplicant,
    selectedApplicantLoaded,
    groups,
    groupsLoaded,
  } = globalState

  const [values, setValues] = React.useState({
    uid: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    active: true,
    dateJoined: new Date().toISOString().slice(0,10),
    groupId: null
  })

  useEffect(() => {
    if (props.match.params.uid) {
      if (!selectedApplicantLoaded) {
        globalActions
          .fetchApplicant(props.match.params.uid)
          .then(() => setValues(Object.assign(values, selectedApplicant)))
      } else {
        setValues(Object.assign(values, selectedApplicant))
      }
    }
    if(!groupsLoaded) {
      globalActions
        .fetchGroups()
        .then(() => {
          const group = groups.filter((group) => group.name === 'Applicants')[0]
          const grpid =
            groups.length > 0 ? group.uid : null
          setValues(Object.assign(values, {groupId: grpid}))
        })
    }
  }, [props.match.params.uid, groupsLoaded, selectedApplicantLoaded, globalActions, values, selectedApplicant, groups])

  const handleChange = (name) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSave = (event) => {
    globalActions
      .saveSelectedApplicant(values)
      .then((response) => {
        globalActions.setState({selectedApplicantLoaded: false})
        globalActions.navigate(`/applicant/${selectedApplicant.uid}`)
      })
  }

  // const handleReset = () => {
  // }
  //
  // const componentWillUnmount = () => {
  // }

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
            <form>
              <TextField
                required
                id="firstName"
                label="First Name"
                margin="normal"
                variant="outlined"
                value={ values.firstName }
                onChange={ handleChange('firstName') }
              />
              <br />
              <TextField
                required
                id="lastName"
                label="Last Name"
                margin="normal"
                variant="outlined"
                value={ values.lastName }
                onChange={ handleChange('lastName') }
              />
              <br />
              <TextField
                required
                id="email"
                label="Email"
                margin="normal"
                variant="outlined"
                autoComplete="email"
                value={ values.email }
                onChange={ handleChange('email') }
              />
              <br />
              <TextField
                required
                id="dateJoined"
                label="Date Joined"
                margin="normal"
                variant="outlined"
                type="date"
                value={ values.dateJoined }
                onChange={ handleChange('dateJoined') }
              />
              <br />
              <TextField
                id="phone_number"
                label="Phone number"
                margin="normal"
                variant="outlined"
                value={ values.phoneNumber }
                onChange={ handleChange('phoneNumber') }
              />
              <br />
              <FormControlLabel
                control={
                  <Switch
                    onChange={ handleChange('active') }
                    value={ values.active } />
                }
                label="Active"
              />
              <br />
              <Button variant="contained" color="primary" onClick={handleSave}>
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
