import React from 'react'
import { Checkbox, Grid, Paper } from '@material-ui/core'

export const TaskList = (props) => {
  const { associatedTasks, completedTasks, handleChange } = props
  const cTasks = completedTasks
  const _tasks = associatedTasks
    .map((aTask) => {
      const cTask = cTasks.filter((cTask) => cTask.taskTypeId === aTask.taskTypeId)[0]
      return { ...aTask, ...cTask }
    })

    const tasks = () => _tasks.map((task, index) => {
    return (
      <Grid key={ `task-${index}` }>
        <Checkbox
          checked={ task.completed }
          value={ task.completed }
          onChange={ event => handleChange(event, task) }
          disabled={ task.completed }/>&nbsp;

          { task.name }
      </Grid>
    )
  })

  return(
    <Grid container>
      <Grid item xs={ 12 }>
        <h5>Current Task List</h5>
        <Paper>
          { tasks() }
        </Paper>
      </Grid>
    </Grid>
  )
}
