import React, { useEffect } from 'react'
import { Checkbox, Grid, Paper } from '@material-ui/core'
import { useGlobal } from '../../../store'
import { BehaviorSubject } from 'rxjs'

export const TaskList = (props) => {
  const [globalState, globalActions] = useGlobal()
  const { associatedTasks, tasksLoaded } = globalState
  const { fetchAssociatedTasks } = globalActions

  const { completedTasks, handleChange, personType } = props
  const cTasks = completedTasks || []

  let tasks
  const tasks$ = new BehaviorSubject(associatedTasks)
  tasks$.subscribe((_associatedTasks) => {
    const _tasks = _associatedTasks
      .map((aTask) => {
        const cTask = cTasks
          .filter((cTask) => cTask.taskTypeId === aTask.taskTypeId)[0]
        return { ...aTask, ...cTask }
      })

    tasks = _tasks.map((task, index) => (
        <div key={ `task-${index}` }>
          <Checkbox
            checked={ task.completed }
            value={ task.completed }
            onChange={ event => handleChange(event, task) }
          />&nbsp;

          <span className={ task.completed && 'strike' }>{ task.name }</span>
        </div>
      )
    )
  })

  useEffect(() => {
    if(!tasksLoaded) {
      fetchAssociatedTasks(personType)
    }
  })

  return(
    <div>
      <strong>CURRENT TASK LIST</strong>
      <div className="currentTaskList">
        { tasks }
      </div>
    </div>
  )
}
