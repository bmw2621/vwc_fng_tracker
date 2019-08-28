import React, { useEffect } from 'react'
import {
  Grid,
  Paper
} from '@material-ui/core'
import {
  FilteringState,
  IntegratedFiltering,
  EditingState,
  PagingState,
  IntegratedPaging
} from '@devexpress/dx-react-grid'
import {
  Grid as TableGrid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  TableFilterRow
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid'

import { useGlobal } from '../../../store'

export const RatingTypeList = (props) => {
  const [
    globalState,
    globalActions
  ] = useGlobal()

  const {
    ratingTypes,
    ratingTypesLoaded
  } = globalState

  const {
    setState,
    fetchRatingTypes,
    addRatingType,
    saveRatingType,
    deleteRatingType
  } = globalActions

  const blankRatingType = {
    uid: '_:uid',
    type: 'RatingType',
    weightModifier: 0
  }

  const columns = [
    {
      name: 'name',
      title: 'Name'
    },
    {
      name: 'associatedWith',
      title: 'Associated With'
    },
    {
      name: 'weightModifier',
      title: 'Weight Modifier'
    }
  ]

  const getRowUid = row => row.uid

  const commitChanges = (changes) => {
    const { added, changed, deleted } = changes

    let changedRows;
    if (added) {
      const addedItem = added[0]
      const item = { ...blankRatingType, ...addedItem }
      addRatingType(item)
      return ratingTypes
    }
    if (changed) {
      changedRows =
        ratingTypes.map(row => {
        changed[row.uid] && saveRatingType({...row, ...changed[row.uid]})
        return (changed[row.uid] ? { ...row, ...changed[row.uid] } : row)
      })
    }
    if (deleted) {
      const deletedSet = new Set(deleted)
      deleted.forEach((item) => deleteRatingType({ uid: item.uid }))
      changedRows =
        ratingTypes.filter(row => !deletedSet.has(row.uid))
    }
    setState({ ratingTypes: changedRows })
  }

  useEffect(() => {
    if(!ratingTypesLoaded) {
      fetchRatingTypes()
    }
  })

  return (
    <Grid container>
      <Grid item xs={ 2 }>&nbsp;</Grid>

      <Grid item xs={ 8 }>
        <h3>Rating Types</h3>
        <Paper>
        <TableGrid
          rows={ ratingTypes }
          columns={ columns }
          getRowId={ getRowUid }>
          <SortingState
            defaultSorting={[
              { columnName: 'weightModifier', direction: 'desc' },
              { columnName: 'associatedWith', direction: 'asc'},
              { columnName: 'name', direction: 'asc'}
            ]}
          />
          <IntegratedSorting />
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <EditingState onCommitChanges={ commitChanges } />
          <PagingState
            defaultCurrentPage={0}
            pageSize={5}
          />
          <IntegratedPaging />
          <Table />
          <TableFilterRow />
          <TableHeaderRow
            showSortingControls
          />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
          />
          <TableEditRow />
          <PagingPanel />
        </TableGrid>
      </Paper>
      </Grid>
      <Grid item xs={ 2 }>&nbsp;</Grid>
    </Grid>
  )
}
