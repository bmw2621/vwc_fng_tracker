import React, { useEffect, useState } from 'react'
import {
  Grid,
  Paper,
  Button,
  Checkbox
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
  DataTypeProvider
} from '@devexpress/dx-react-grid'
import { DatePicker } from '../DatePicker'
import { FileInput } from '../FileInput'
import { useGlobal } from '../../store'
import PropTypes from 'prop-types'
import moment from 'moment'
import Papa from 'papaparse'

export const TroopGrid = (props) => {
  const [
    globalState,
    globalActions
  ] = useGlobal()

  const {
    setState,
    fetchTroops,
    saveTroop,
    deleteTroop,
    navigate
  } = globalActions

  const { troops, troopsLoaded } = globalState

  const blankTroop = {
    uid: '_:uid',
    type: 'person',
    pesronType: props.personType
  }

  const rows = troops || []
  const columns = [
    {
      name: 'lastName',
      title: 'First Name'
    },
    {
      name: 'firstName',
      title: 'Last Name'
    },
    {
      name: 'email',
      title: 'Email'
    },
    {
      name: 'dateApplied',
      title: 'Date Applied'
    },
    {
      name: 'country',
      title: 'Country'
    },
    {
      name: 'city',
      title: 'City'
    },
    {
      name: 'state',
      title: 'State'
    },
    {
      name: 'active',
      title: 'Active'
    },
    {
      name: '',
      title: '',
      getCellValue: row => {
        return (
          <Button
            color="primary"
            onClick={() => navigate(`/applicant/show/${row.uid}`)}>
            MANAGE
          </Button>
        )
      },
      editingEnabled: false
    }
  ]

  const [filteringStateColumnExtensions] = useState([
    { columnName: '', filteringEnabled: false },
  ])

  const BooleanFormatter = ({ value }) => (
    <Checkbox checked={ value } value={ value } />
  )

  const BooleanEditor = ({ value, onValueChange }) => (
    <Checkbox
      checked={ value }
      value={ value }
      onChange={event => onValueChange(event.target.value)} />
  )

  const BooleanTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={ BooleanFormatter }
      editorComponent={ BooleanEditor }
      { ...props } />
  )

  const EmailFormatter = ({ value }) => (<a href={`mailto:${value}`}>{value}</a>)
  const EmailTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={ EmailFormatter }
      { ...props }
    />
  )
  const DateFormatter = ({ value }) => moment(value).format('YYYY-MM-DD')
  const DateEditor = ({ value, onValueChange }) => (
    <DatePicker
      value={ value }
      handleChange={ onValueChange }
      format={ 'YYYY-MM-DD' }/>
  )

  const DateTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={DateFormatter}
      editorComponent={DateEditor}
      {...props}
    />)

  const getRowUid = row => row.uid
  const getRowActive = row => row.active
  const commitChanges = (changes) => {
    const { added, changed, deleted } = changes

    let changedRows;
    if (added) {
      const addedItem = added[0]
      const item = { ...blankTroop, ...addedItem }
      saveTroop(item)
      return troops
    }
    if (changed) {
      changedRows =
        troops.map(row => {
        changed[row.uid] && saveTroop({...row, ...changed[row.uid]})
        return (changed[row.uid] ? { ...row, ...changed[row.uid] } : row)
      })
    }
    if (deleted) {
      const deletedSet = new Set(deleted)
      deleted.forEach((item) => deleteTroop({ uid: item }))
      changedRows =
        troops.filter(row => !deletedSet.has(row.uid))
    }
    setState({ troops: changedRows })
  }

  const formatCsvData = (csvData) => {
    return csvData.map((item, index) => {
      return {
        ...item,
        uid: `_:uid-${ index }`,
        dateApplied: moment(item.dateApplied).toDate()
      }
    })
  }

  const onFileInput = async (event) => {
    let parsed
    const config = {
      download: true,
      header: true,
      complete: (results, file) => {
        if (results.errors.length === 0) {
          const records = formatCsvData(results.data)
          saveTroop(records)
          fetchTroops('applicant')
        } else {
          console.error('DataParseError: Your CSV file contained one or more errors, please fix and try again', parsed.errors)
        }
      }
    }

    Papa.parse(event.target.files[0], config)
  }

  useEffect(() => {
    !troopsLoaded && fetchTroops(props.personType)
  })

  return (
    <Grid container>
      <Grid container xs={ 1 }>&nbsp;</Grid>
        <Grid container xs={ 10 }>
          <Grid container spacing={2}>
          <Grid item xs={10}>
            <h3>{ props.title }</h3>
          </Grid>
          <Grid item xs={2} style={{textAlign: 'right', alignItems: 'right'}}>
            <br />
            <FileInput onChange={ onFileInput } label={ 'IMPORT CSV' }/>
          </Grid>
        </Grid>
          <Paper>
          <TableGrid
            rows={ rows }
            columns={ columns }
            getRowId={ getRowUid }>
            <BooleanTypeProvider for={ ['active'] } />
            <DateTypeProvider for={ ['dateApplied'] } />
            <EmailTypeProvider for={ ['email'] } />
            <SortingState
              defaultSorting={[
                { columnName: 'uid', direction: 'asc' },
                { columnName: 'lastName', direction: 'asc' },
                { columnName: 'firstName', direction: 'asc'},
                { columnName: 'email', direction: 'asc'},
                { columnName: 'dateApplied', direction: 'asc'},
                { columnName: 'country', direction: 'asc'},
                { columnName: 'city', direction: 'asc'},
                { columnName: 'state', direction: 'asc'},
                { columnName: 'active', direction: 'asc'}
              ]}
            />
            <IntegratedSorting />
            <FilteringState
              defaultFilters={ [] }
              columnExtensions={ filteringStateColumnExtensions }/>
            <IntegratedFiltering />
            <EditingState onCommitChanges={ commitChanges } />
            <PagingState
              defaultCurrentPage={0}
              pageSize={10}
            />
            <IntegratedPaging />
            <Table/>
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
      <Grid container xs={ 1 }>&nbsp;</Grid>
    </Grid>
  )
}

TroopGrid.propTypes = {
  props: PropTypes.object,
  user: PropTypes.object,
  personType: PropTypes.string,
  title: PropTypes.string
}
