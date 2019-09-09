import React, { useEffect } from 'react'
import { EditingState } from '@devexpress/dx-react-grid';
import { Grid, Paper } from '@material-ui/core'
import {
  Grid as TableGrid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn
} from '@devexpress/dx-react-grid-material-ui'
import { useGlobal } from '../../../store'
import { BehaviorSubject } from 'rxjs'

export const TaskTypeGrid = (props) => {
  const [globalState, globalActions] = useGlobal()
  const { taskTypes } = globalState
  const { fetchTaskTypes } = globalActions
  const { taskListTypeUid } = props

  let rows
  const taskTypes$ = new BehaviorSubject(taskTypes)
  taskTypes$.subscribe(() => {
    rows = taskTypes
      .filter(type => type.taskListTypeUid === taskListTypeUid)
  })

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
    return rows
  }

  return (
    <TableGrid
      rows={ rows }
      columns={[
        {
          name: 'name',
          title: 'Name'
        },
        {
          name: 'displayOrder',
          title: 'Display Order'
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
    </TableGrid>
  )
}
