import React, { useState } from 'react'
import { IconButton, Grid, Paper, Chip } from '@material-ui/core'
import { useGlobal } from '../../../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskListTypeForm } from './'
import { of } from 'rxjs'
import { useShowHideForm } from '../../../hooks'
import { TaskTypeForm, TaskType } from '../../'

export const TaskListTypeItem = (props) => {
  const [globalState, globalActions] = useGlobal()
  const tlt = props.tlt
  const {
    setState,
    editTaskListType,
    deleteTaskListType,
    deleteTaskType,
    addTaskType
  } = globalActions

  const {
    taskListTypes,
    currentTaskType
  } = globalState
  const [newVisible, setNewVisible] = useState(false)

  const blankTaskListType = {
    uid: '_:uid',
    name: '',
    editing: false,
    type: 'TaskListType',
    associatedWith: '',
    includesTaskType: []
  }

  const blankTaskType = {
    uid: '_:uid',
    name: '',
    editing: false,
    type: 'TaskType',
    ownerUid: props.ownerUid,
    displayOrder: 0,
    associatedWith: ''
  }

  const showHideEdit =
  	useShowHideForm(globalActions, tlt, blankTaskListType, 'edit')

  const [showEdit, hideEdit, editVisible] = showHideEdit

  const handleDelete = (event) => {
    deleteTaskListType(tlt)
      .subscribe(() => {
        setState({
          taskListTypes: taskListTypes.filter((item) => item.uid !== tlt.uid)
        })
      })
  }

  const handleDeleteTaskType = (event, item) => {
    const deleteItem = { uid: tlt.uid, hasTaskTypes: { uid: item.uid } }
    deleteTaskType(deleteItem)
      .subscribe(() => {
        const list = taskListTypes.filter((tltItem) => tltItem.uid !== tlt.uid)
        const ttList = tlt.taskTypes.filter((ttItem) => ttItem.uid !== item.uid)
        const ownerItem = { ...tlt, taskTypes: ttList }
        const newList = [...list, ownerItem]
        setState({taskListTypes: newList})
      })
  }

  const handleNew = (event) => {
    of(setState({ currentTaskType: blankTaskType }))
      .subscribe(() => setNewVisible(true))
  }

  const handleCancelNew = (event) => {
    of(setState({ currentTaskType: blankTaskType }))
      .subscribe(() => setNewVisible(false))
  }


  const handleSave = (event, taskListType) => {
    editTaskListType(taskListType)
      .subscribe(prom => {
        prom.then(tlts => {
          tlts.subscribe(list => {
            setState({
              taskListTypes: list,
              currentTaskListType: blankTaskListType
            })
            hideEdit()
          })
        })
      })
  }

  const handleSaveTaskType = (event, taskType) => {
    addTaskType(taskType)
      .subscribe(prom => {
        prom.then(tls => {
          const item = { ...currentTaskType, uid: tls.uid }
          const taskListType = {
            ...tlt,
            taskTypes: [...tlt.taskTypes, item]
          }
          const oldTaskListTypes = taskListTypes
            .filter(oldtlt => oldtlt.uid !== tlt.uid)
          const updatedTaskListTypes = [...oldTaskListTypes, taskListType]

          setState({taskListTypes: updatedTaskListTypes})
          setNewVisible(false)
        })
      })
  }

  const handleEdit = (event) => {
    of(setState({ currentTaskListType: tlt }))
      .subscribe(() => showEdit())
  }

  const handleCancelEdit = (event) => {
    of(setState({ currentTaskType: blankTaskType }))
      .subscribe(() => hideEdit())
  }

  const taskTypeForm = () => {
    if(newVisible) {
      return (
        <TaskTypeForm
          tt={ currentTaskType }
          handleCancel={ handleCancelNew }
          handleSave={ handleSaveTaskType }
          ownerUid={tlt.uid}/>
        )
    }
  }

  const taskTypes = () => {
    const taskTypeList = tlt.taskTypes || []
    if(taskTypeList.length > 0) {
      return taskTypeList.map((item, index) => {
        return (
          <TaskType
            key={ `taskType-${ item.uid }` }
            item={ item }
            ownerUid={ tlt.uid }
            handleDelete={ handleDeleteTaskType }
            />
        )
      })
    } else {
      return(
        <Grid container>
          <Grid item xs={ 12 }>No Task Types yet. Create some!</Grid>
        </Grid>
      )
    }
  }

  const formOrData = () => {
    if(editVisible) {
      return (
        <TaskListTypeForm
          tlt={ tlt }
          handleCancel={ handleCancelEdit }
          handleSave={ handleSave }/>
      )
    } else {
      return (
        <Grid item xs={ 12 }>
          <strong>TaskListType Name:</strong>{ tlt.name } <br />
          <strong>Associated with:</strong>{ tlt.associatedWith }
        </Grid>
      )
    }
  }

  return(
    <Paper style={{ padding: 20, marginTop: 5, backgroundColor: '#ffefee', marginBottom: 5 }}>
      <Grid container>
        <Grid item xs={ 8 }>
          <Grid container>
            <Grid item xs={ 12 }>
              { formOrData() }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={ 4 } style={{textAlign: 'right', alignItems: 'right'}}>
          <IconButton
            color="primary"
            onClick={ handleEdit }>
            <FontAwesomeIcon icon="pencil-alt" size="sm" />
          </IconButton>&nbsp;
          <IconButton
            color="secondary"
            onClick={ handleDelete }>
            <FontAwesomeIcon
                icon="trash"
                size="sm" ></FontAwesomeIcon>
          </IconButton>
        </Grid>
        <Grid item xs={ 12 }>
          { taskTypes() }
          { taskTypeForm() }
        </Grid>
        <Grid item xs={ 6 } style={{ marginTop: 5}}></Grid>
        <Grid
          item xs={ 4 }
          style={{
            textAlign: 'right',
            alignItems: 'right',
            marginTop: 5
          }}>
          <Chip label="NEW TASK TYPE"
            color="primary"
            icon={
              <FontAwesomeIcon
                icon="plus-circle"
                size="lg" ></FontAwesomeIcon>
            }
            onClick={ handleNew } />
        </Grid>

      </Grid>
    </Paper>
  )
}
