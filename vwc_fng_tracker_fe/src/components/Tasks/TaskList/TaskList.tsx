import React, { useEffect } from 'react'
import { Checkbox, Grid, Paper } from '@material-ui/core'
import { useGlobal } from '../../../store'
import { BehaviorSubject, combineLatest } from 'rxjs'

export const TaskList = (props) => {
  const [globalState, globalActions] = useGlobal()
  const {
    troopsTaskTypes,
    troopsTaskTypesLoaded
  } = globalState
  const { fetchTroopsTaskTypes } = globalActions
  const {
    completedTasks,
    handleChange,
    personType
  } = props

  let tasks
  const tasks$ = new BehaviorSubject(troopsTaskTypes)
  const completedTasks$ = new BehaviorSubject(completedTasks)

  combineLatest(tasks$, completedTasks$)
    .subscribe(([_troopsTaskTypes, cTasks]) => {
    const _tasks = _troopsTaskTypes
    .map((aTask) => {
        const blank = { uid: '_:uid' } 
        const cTask = cTasks
          .filter((cTask) => cTask.name === aTask.name)[0]
        return { ...aTask, ...blank, ...cTask }
      })

    tasks = _tasks.map((task, index) => (
        <div key={ `task-${index}` }>
          <Checkbox
            checked={ task.completed }
            value={ task.completed }
            onChange={ event => handleChange(event, task) }
          />&nbsp;

          <span className={ task.completed && 'strike' }>
            { task.name }
          </span>
        </div>
      )
    )
  })

  useEffect(() => {
    if(!troopsTaskTypesLoaded) {
      fetchTroopsTaskTypes(personType)
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
