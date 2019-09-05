import {
  associatedTaskListTypeQuery,
  taskListTypesQuery
} from '../queries'
import { of } from 'rxjs'
import { doDelete } from './'
import { runQuery, runMutation } from '../helpers'

export const fetchTaskLists = (store) => {

}

export const addTaskList = (store, obj) => {
  of(saveTaskList(store, obj))
    .subscribe((data) => console.log(obj, data))
}

export const saveTaskList = (store, obj) => {
  return runMutation(obj)
}

export const fetchTasks = (store) => {

}

export const addCompletedTask = async (store, item) => {
  const ret = runMutation(item)
  return ret
}

export const fetchAssociatedTasks = async (store, associatedWith: string) => {
  const tasks = associatedTaskListTypeQuery(associatedWith)
  const taskList = await runQuery(tasks)
  store.setState({associatedTasks: taskList['taskList'], tasksLoaded: true})
  return taskList
}

export const saveTask = async (store, item) => {
  const result = await runMutation(item)
  return result
}

export const deleteTaskType = (store, item) => {
  return of(doDelete(store, item))
}

export const addTaskType = (store, item) => {
  const taskType = item.hasTaskTypes
  const taskListTypes =
    store.state.taskListTypes.filter(tlt => tlt.uid !== item.uid)
  const taskListType =
    store.state.taskListTypes.filter(tlt => tlt.uid === item.uid)[0]

    return of(
    runMutation(item)
      .then(uid => {
        const newTaskType = { ...taskType, uid: uid }
        const oldTaskTypes = taskListType.taskTypes || []
        const newTaskTypes = [...oldTaskTypes, newTaskType]
        const newTaskListType = { ...taskListType, taskTypes: newTaskTypes }
        return of([...taskListTypes, newTaskListType])
      })
  )
}

export const fetchTaskListTypes = async (store) => {
  const data = await runQuery(taskListTypesQuery())
  return store.setState({
    taskListTypes: data['taskListTypes'] || [],
    taskListTypesLoaded: true
  })
}

export const addTaskListType = (store, item) => {
  const currentState = store.state.taskListTypes
  return of(
    saveTaskListType(store)
      .then((newUid) =>  {
        const newItem = { ...item, uid: newUid }
        return of([...currentState, newItem])
      }))
}

export const editTaskListType = (store, item) => {
  const currentState = store.state.taskListTypes
  return of(
    saveTaskListType(store)
      .then(() => of(currentState))
  )
}

export const deleteTaskListType = (store, item) => {
  const obj = { uid: item.uid }
  return of(doDelete(store, obj))
}

export const saveTaskListType = (store) => {
  const taskListType = Object.assign(store.state.currentTaskListType, { editing: false })
  return runMutation(taskListType)
}

export const saveTaskType = (store, data) => runMutation(data)
