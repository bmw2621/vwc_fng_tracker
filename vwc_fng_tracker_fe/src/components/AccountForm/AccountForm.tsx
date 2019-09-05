import React from 'react'
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
    type: ''
  }

  const save = () => {
    const data = {
      uid: props.applicantUid,
      ownsAccount: {
        uid: '_:a',
        name: values.name,
        type: values.type
      }
    }
    handleSave(data)
  }

  const { handleSubmit, handleChange, values } =
    useForm(save, globalState, 'newAccount', globalActions)

  const selectStyles = {
    width: 180
  }

  const accountTypes = props.accountTypes || []

  const optionsList = accountTypes.map((accountType, index) => {
    return (
      <option
        key={ `accountType-${index + 1}` }
        value={ accountType.name }>
        {accountType.name}
      </option>
    )
  })

  return(
    <form onSubmit={ handleSubmit }>
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
          value={ values.type }
          onChange={ handleChange }
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
        onChange={ handleChange }/>
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
        type="submit"
        color="primary">
        Save
      </Button>
    </form>
  )
}
