import React, { useEffect } from 'react'
import { EditingState, RowDetailState } from '@devexpress/dx-react-grid';
import { Grid, Paper } from '@material-ui/core'
import {
  Grid as TableGrid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  TableRowDetail
} from '@devexpress/dx-react-grid-material-ui'
import { useGlobal } from '../../../store'
import { TaskTypeGrid } from './TaskTypeGrid'
import { BehaviorSubject } from 'rxjs'

export const TaskListTypeGrid = (props) => {
  const [globalState, globalActions] = useGlobal()
  const {
    taskListTypes,
    taskListTypesLoaded,
    blankTaskListType
  } = globalState
  const {
    fetchTaskListTypes,
    fetchTaskTypes,
    setState,
    saveTaskListType
  } = globalActions

  useEffect(() => {
    if(!taskListTypesLoaded) {
      fetchTaskListTypes()
      fetchTaskTypes()
    }
  })

  let rows
  const taskListTypes$ = new BehaviorSubject(taskListTypes)
  taskListTypes$.subscribe(() => {
    rows = taskListTypes
  })

  const getRowUid = row => row.uid
  const getRowActive = row => row.active
  const commitChanges = (changes) => {
    let changedRows
    const {added, changed, deleted } = changes
    if(added) {
      const addedItem = added[0]
      const item = { ...blankTaskListType, ...addedItem }
      saveTaskListType(item)
      return rows
    }
    if(changed) {
      changedRows = rows.map(row => (changed[row.uid] ? { ...row, ...changed[row.uid] } : row))
    }
    if(deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.uid))
    }
    setState({taskListTypes: changedRows})
  }

  const RowDetail = ({ row }) => (
    <TaskTypeGrid taskListTypeUid={ row.uid } />
    )

  return (
    <Grid container>
      <Grid item xs={ 1 }></Grid>
      <Grid item xs={ 10 }>
        <h3>Task List Types</h3>
        <Paper>
          <TableGrid
            rows={ rows }
            columns={[
              {
                name: 'name',
                title: 'Name'
              },
              {
                name: 'associatedWith',
                title: 'Associated With'
              }
            ]}>
          <Table />
          <EditingState onCommitChanges={ commitChanges } />
          <RowDetailState />
          <TableHeaderRow />
          <TableRowDetail contentComponent={RowDetail} />
          <TableEditRow />
            <TableEditColumn
              showAddCommand
              showEditCommand
              showDeleteCommand
            />
          </TableGrid>
        </Paper>
      </Grid>
      <Grid item xs={ 1 }></Grid>
  </Grid>
  )
}
