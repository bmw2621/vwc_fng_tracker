import React, { useEffect, useState } from 'react'
import {
  Grid,
  Paper,
  Button,
  Checkbox
} from '@material-ui/core'
import {
  FilteringState,
  SelectionState,
  IntegratedFiltering,
  EditingState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection
} from '@devexpress/dx-react-grid'
import {
  Grid as TableGrid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  TableFilterRow,
  TableSelection,
  TableRowDetail
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
  RowDetailState
} from '@devexpress/dx-react-grid'
import { DatePicker } from '../DatePicker'
import { FileInput } from '../FileInput'
import { useGlobal } from '../../store'
import PropTypes from 'prop-types'
import moment from 'moment'
import Papa from 'papaparse'
import './TroopGrid.scss'
import { ApplicantDetailRow } from './'
import { BehaviorSubject, combineLatest } from 'rxjs'

export const TroopGrid = (props) => {
  const [
    globalState,
    globalActions
  ] = useGlobal()

  const {
    setState,
    fetchTroops,
    fetchTroopsTasks,
    fetchTroopsAccounts,
    fetchTroopsRatings,
    fetchTroopsComments,
    fetchAccountTypes,
    fetchAssociatedTasks,
    fetchRatingTypes,
    saveTroop,
    deleteTroop,
    navigate
  } = globalActions

  const {
    troops,
    troopsTasks,
    troopsAccounts,
    troopsRatings,
    troopsComments,
    troopsLoaded,
    troopGridSelection,
    associatedTasks,
    accountTypes,
    accountTypesLoaded,
    tasksLoaded,
    ratingTypesLoaded,
    troopsTasksLoaded,
    troopsRatingsLoaded,
    troopsAccountsLoaded,
    troopsCommentsLoaded
  } = globalState

  const { user } = props
  const personType =
    `${props.personType[0].toUpperCase()}${props.personType.substring(1)}`
  const blankTroop = {
    uid: '_:uid',
    'dgraph.type': ['Person', personType]
  }

  const troops$ = new BehaviorSubject(troops)
  const tasks$ = new BehaviorSubject(troopsTasks)
  const accounts$ = new BehaviorSubject(troopsAccounts)
  const comments$ = new BehaviorSubject(troopsComments)
  const ratings$ = new BehaviorSubject(troopsRatings)

  let rows = []

  combineLatest(
    troops$,
    tasks$,
    accounts$,
    comments$,
    ratings$
  ).subscribe(([lTroops, lTasks, lAccounts, lComments, lRatings]) => {
    rows = lTroops.map((lTroop, index) => {
      return {
        ...{
          comments: [],
          accounts: [],
          tasks: [],
          ratings: []
        },
        ...lTroop,
        ...lTasks[index],
        ...lAccounts[index],
        ...lComments[index],
        ...lRatings[index]
      }
    })
  })

  const editingStateColumnExtensions = [
    { columnName: '', editingEnabled: false }
  ]

  const columns = [
    {
      name: 'lastName',
      title: 'Last Name'
    },
    {
      name: 'firstName',
      title: 'First Name'
    },
    {
      name: 'email',
      title: 'Email'
    },
    {
      name: 'phone',
      title: 'Phone'
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
      onChange={event => onValueChange(event.target.checked)} />
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
  const DateFormatter = ({ value }) => value ? moment(value).format('YYYY-MM-DD') : null
  const DateEditor = ({ value, onValueChange }) => (
    <DatePicker
      value={ value }
      handleChange={ event => onValueChange(event.target.value) }
      format={ 'YYYY-MM-DD' }/>
  )

  const DateTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={DateFormatter}
      editorComponent={DateEditor}
      {...props}
    />)

  const RowDetail = ({ row }) => {
    const component = {
      Applicant: (
        <ApplicantDetailRow
          user={ user }
          row={ row } />
      ),
      Candidate: (<div>Placeholder</div>),
      Student: (<div>Placeholder</div>),
      Mentor: (<div>Placeholder</div>)
    }

    return component[personType]
  }

  const getRowUid = row => row.uid
  const getRowActive = row => row.active
  const commitChanges = (changes) => {
    const { added, changed, deleted } = changes

    let changedRows;
    if (added) {
      const addedItem = added[0]
      const item = { ...blankTroop, ...addedItem }
      saveTroop(item)
        .then(() => setState({troopsLoaded: false}))
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
        dateApplied: moment(item.dateApplied).toDate(),
        active: true,
        'dgraph.type': ['Person', personType]
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
    if(!troopsLoaded) {
      fetchTroops(personType)
      .then(() =>{
        if(!troopsAccountsLoaded){
          fetchTroopsAccounts(personType)
            .then(() => {
              if(!troopsCommentsLoaded) {
                fetchTroopsComments(personType)
                .then(() => {
                  if(!troopsRatingsLoaded){
                    fetchTroopsRatings(personType)
                    .then(() => {
                      if(!troopsTasksLoaded){
                        fetchTroopsTasks(personType)
                      }
                    })
                    }
                  })
              }
            })
        }
      })
    }
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
            <DateTypeProvider for={ ['dateApplied', 'dateStartedPrework'] } />
            <EmailTypeProvider for={ ['email'] } />
            <SortingState
              defaultSorting={[
                { columnName: 'lastName', direction: 'asc' },
              ]}
            />
            <IntegratedSorting />
            <FilteringState
              defaultFilters={ [] }
              columnExtensions={ filteringStateColumnExtensions } />
            <IntegratedFiltering />
            <EditingState
              onCommitChanges={ commitChanges }
              columnExtensions={editingStateColumnExtensions} />
            <PagingState
              defaultCurrentPage={0}
              pageSize={10}
              />
            <RowDetailState />
            <IntegratedPaging />
            <Table/>
            <TableFilterRow />
            <TableHeaderRow
              showSortingControls
            />
            <TableRowDetail contentComponent={RowDetail} />
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
