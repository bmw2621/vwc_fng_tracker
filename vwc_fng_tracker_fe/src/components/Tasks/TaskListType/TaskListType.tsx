import React, { useEffect, useState } from 'react'
import { Chip, Grid } from '@material-ui/core'
import TypoGraphy from '@material-ui/core/Typography'
import { useGlobal } from '../../../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskListTypeForm, TaskListTypeItem } from './'
import { useShowHideForm } from '../../../hooks'
import { of } from 'rxjs'

export const TaskListType = (props) => {
  const [globalState, globalActions] = useGlobal()
  const {
    taskListTypes,
		taskListTypesLoaded,
    currentTaskListType,
    currentTaskType
  } = globalState

  const {
    fetchTaskListTypes,
    setState,
    addTaskListType,
    saveTaskListType
  } = globalActions

  const blankTaskListType = {
    uid: '_:uid',
    name: '',
    editing: false,
    type: 'TaskListType',
    associatedWith: '',
    hasTaskTypes: []
  }

  const [newVisible, setNewVisible] = useState(false)

  const handleSave = (event, taskListType) => {
    addTaskListType(taskListType)
      .subscribe(prom => {
        prom.then(tlt => {
          tlt.subscribe((list) => {
            setState({
              taskListTypes: list,
              currentTaskListType: blankTaskListType
            })
            setNewVisible(false)
          })
        })
      })
  }

  const handleNewClick = (event) => {
    of(setState({ currentTaskListType: blankTaskListType, editing: true }))
      .subscribe(() => setNewVisible(true))
  }

  const handleCancel = (event) => {
    of(setState({ currentTaskListType: blankTaskListType, editing: false }))
      .subscribe(() => setNewVisible(false))
  }

  useEffect(() => {
    if(!taskListTypesLoaded) {
      fetchTaskListTypes()
      setState({ currentTaskListType: blankTaskListType, taskListTypesLoaded: true })
    }
  })

  const taskListTypeItems = () => {
    if(taskListTypes.length === 0) {
      return(<TypoGraphy>No Task List Types. You should create some.</TypoGraphy>)
    } else {
      return taskListTypes.map((tlt, index) => {
        return (
          <TaskListTypeItem
            key={ `TaskListType-${index}`}
            tlt={ tlt }
          />
        )
      })
    }
  }

  const newForm = () => {
    return (
      <TaskListTypeForm
        tlt={ currentTaskListType }
        handleCancel={ handleCancel }
        handleSave={ handleSave }/> )
  }

  return(
    <Grid container>
      <Grid item xs={ 2 }>&nbsp;</Grid>
      <Grid item xs={ 8 }>
        <Grid container>
          <Grid item xs={ 6 }>
            <TypoGraphy variant={ 'h6' }>Task List Types</TypoGraphy>
          </Grid>
          <Grid item xs={ 6 } style={{textAlign: 'right', alignItems: 'right'}}>
            <Chip label="NEW TASKLIST TYPE"
              color="primary"
              icon={
                <FontAwesomeIcon
                  icon="plus-circle"
                  size="lg" ></FontAwesomeIcon>
              }
              onClick={ handleNewClick } />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={ 12 }>
            { newVisible && newForm() }
            { taskListTypeItems() }
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={ 2 }>&nbsp;</Grid>
    </Grid>
  )
}
