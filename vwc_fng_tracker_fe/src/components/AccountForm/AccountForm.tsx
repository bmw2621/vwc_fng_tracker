import React, { useState } from 'react'
import { useGlobal } from '../../store'
import { useForm } from '../../hooks'
import {
  Button,
  Grid,
  InputLabel,
  FormControl,
  Select,
  TextField
} from '@material-ui/core'

export const AccountForm = (props) => {
  const { handleSave, handleCancel } = props
  const [globalState, globalActions] = useGlobal()
  const {
    saveAccount,
    setState
  } = globalActions

  const cleared = {
    applicantUid: props.applicantUid,
    uid: '_:a',
    accountType: '',
    name: '',
    'dgraph.type': 'Account'
  }

  const [values, setValues] = useState({name: '', accountType: ''})

  const save = () => {
    const data = {
      uid: props.applicantUid,
      account: {
        uid: '_:a',
        name: values.name,
        accountType: { uid: values.accountType },
        'dgraph.type': 'Account'
      }
    }
    handleSave(data)
  }

  const handleChangeName = (event) => {
    setValues({ ...values, name: event.target.value })
  }

  const handleSelection = (event) => {
    setValues({ ...values, accountType: event.target.value })
  }

  const selectStyles = {
    width: 180
  }

  const accountTypes = props.accountTypes || []

  const optionsList = accountTypes.map((accountType, index) => {
    return (
      <option
        key={ `accountType-${index + 1}` }
        value={ accountType.uid }>
        {accountType.name}
      </option>
    )
  })

  return(
    <form>
      <input
        type="hidden"
        id="applicantUid"
        value={ props.applicantUid } />
      <FormControl>
        <InputLabel
          htmlFor="accountType">
          Account Type
        </InputLabel>
        <Select
          native
          style={ selectStyles }
          value={ values.accountType }
          onChange={ handleSelection }
          inputProps={{
            name: 'type',
            id: 'type',
          }}>
          <option key="accountType-0" value=""></option>
          { optionsList }
        </Select>
      </FormControl>
      &nbsp;
      <TextField
        id="name"
        name="name"
        label="Account Name"
        value={ values.name || ''}
        onChange={ handleChangeName }/>
      &nbsp;
      <Button
        size="small"
        variant="contained"
        type="button"
        onClick={ handleCancel }
        color="secondary">
        Cancel
      </Button>&nbsp;
      <Button
        size="small"
        variant="contained"
        type="button"
        color="primary"
        onClick={ save }
      >
        Save
      </Button>
    </form>
  )
}
