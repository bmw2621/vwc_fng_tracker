import React from 'react'
import { Button, Grid, Paper, TextField } from '@material-ui/core'
import TypoGraphy from '@material-ui/core/Typography'
import { useForm } from '../../../hooks'
import { useGlobal } from '../../../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { of } from 'rxjs'

export const TaskListTypeForm = (props) => {
  const [globalState, globalActions] = useGlobal()
  const { currentTaskListType, taskListTypes } = globalState
  const { fetchTaskListTypes, saveTaskListType, setState } = globalActions
  const { handleCancel, handleSave } = props
  const title = () => {
    const newTitle = 'New TaskListType'
    const editTitle = 'Editing TaskListType'
    return currentTaskListType.uid === '_:uid' ? newTitle : editTitle
  }

  const save = (event) => {
    handleSave(event, currentTaskListType)
  }

  const { handleChange, handleSubmit, values } =
    useForm(save, globalState, 'currentTaskListType', globalActions)

  return(
    <Paper style={{ padding: 10 }}>
      <Grid container>
        <Grid item xs={ 12 }>
          <TypoGraphy variant={ 'h6' }>
            { title() }
          </TypoGraphy>
        </Grid>
        <Grid item xs={ 4 } style={{padding: 5}}>
          <TextField
            name="name"
            id="name"
            label="Name"
            value={ values.name }
            onChange={ handleChange } />
        </Grid>
        <Grid item xs={ 4 } style={{padding: 5}}>
          <TextField
            name="associatedWith"
            id="associatedWith"
            label="Associated with"
            value={ values.associatedWith }
            onChange={ handleChange } />
        </Grid>
        <Grid
          item
          xs={ 4 }
          style={{ alignItems: 'right', textAlign: 'right' }}>
          <Button
            color={ 'secondary' }
            onClick={ handleCancel }>Cancel</Button>
          <Button
            color="primary"
            onClick={ handleSubmit }>Save</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
