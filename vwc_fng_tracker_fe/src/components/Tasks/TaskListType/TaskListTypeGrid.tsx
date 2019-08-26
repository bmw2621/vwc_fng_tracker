import React, { useEffect } from 'react'
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui'
import { useGlobal } from '../../../store'
import { useForm } from '../../../hooks'

export const TaskListTypeGrid = (props) => {
  const [globalState, globalActions] = useGlobal()
  const {
    taskListTypes,
    taskListTypesLoaded
  } = globalState
  const { fetchTaskListTypes } = globalActions

  useEffect(() => {
    if(!taskListTypesLoaded) {
      fetchTaskListTypes()
    }
  })

  const [rows, setRows] = taskListTypes.map((type, index) => {
      return Object.assign(type, { id: index })
    }
  )

  const commitChanges = (changes) => {
    let changedRows
    const {added, changed, deleted } = changes
    if(added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if(changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row))
    }
    if(deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id))
    }
    setRows(changedRows)
  }

  return (
    <Grid
      rows={ taskListTypes }
      columns={[
        {
          name: 'uid',
          title: 'UID'
        },{
          name: 'name',
          title: 'Name'
        },{
          name: 'associatedWith',
          title: 'Associated With'
        }
      ]}>
    <Table />
    <EditingState onCommitChanges={ commitChanges } />
    <TableHeaderRow />
    <TableEditRow />
      <TableEditColumn
        showAddCommand
        showEditCommand
        showDeleteCommand
      />
  </Grid>
  )
}
