import {
  associatedTaskListTypeQuery,
  taskListTypesQuery,
  taskTypesQuery
} from '../queries'
import { of } from 'rxjs'
import { doDelete } from './'
import { runQuery, runMutation } from '../helpers'

export const saveTaskListType = async (store, obj) => {
  const result = runMutation(obj)
  return result
}

export const addCompletedTask = async (store, item) => {
  const ret = await runMutation(item)
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

export const fetchTaskListTypes = async (store) => {
  const data = await runQuery(taskListTypesQuery())
  return store.setState({
    taskListTypes: data['taskListTypes'] || [],
    taskListTypesLoaded: true
  })
}

export const fetchTaskTypes = async (store) => {
  const data = await runQuery(taskTypesQuery())
  return store.setState({
    taskTypes: data['taskTypes'] || []
  })
}

export const deleteTaskListType = (store, item) => {
  const obj = { uid: item.uid }
  return of(doDelete(store, obj))
}

export const saveTaskType = (store, data) => runMutation(data)
