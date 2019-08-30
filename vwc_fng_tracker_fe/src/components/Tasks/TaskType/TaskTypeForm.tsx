import React from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import { useGlobal } from '../../../store'
import { useForm } from '../../../hooks'

export const TaskTypeForm = (props) => {
  const [globalState, globalActions] = useGlobal()
  const {
    ownerUid,
    handleSave,
    handleCancel
  } = props

  const save = (event) => {
    handleSave(event, {
      uid: ownerUid,
      hasTaskTypes: {
        uid: values.uid,
        name: values.name,
        completed: values.completed,
        dateCompleted: '',
        ownerUid: ownerUid,
        displayOrder: values.displayOrder
      }
    })
  }

  const { handleChange, handleSubmit, values } =
    useForm(save, globalState, 'currentTaskType', globalActions)

  return(
    <Grid style={{ padding: 5 }} container>
      <Grid item xs={ 4 }>
        <TextField
          id="name"
          value={ values.name }
          onChange={ handleChange }
          label="Name"/>
      </Grid>
      <Grid item xs={ 4 }>
        <TextField
          id="displayOrder"
          value={ values.displayOrder }
          onChange={ handleChange }
          label="Order"/>
      </Grid>
      <Grid item xs={ 4 }>
        <Button color="secondary" onClick={ handleCancel }>CANCEL</Button>
        <Button color="primary" onClick={ handleSubmit }>SAVE</Button>
      </Grid>
    </Grid>
  )
}
