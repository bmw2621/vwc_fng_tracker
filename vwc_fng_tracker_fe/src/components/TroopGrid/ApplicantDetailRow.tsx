import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { TaskList, RatingsList, AccountsList } from '../'
import {
  DetailRowHeader,
  TroopDetailRow,
  TroopAbout
} from './'
import { useGlobal } from '../../store'
import GithubCalendar from 'github-calendar'
import 'github-calendar/dist/github-calendar-responsive.css'
import { Comments } from '../Comments'

/**
 * @name: ApplicantDetailRow
 * @description:
 *   Provides components for Applicant details in TroopGrid
 * @param { row<any> }: extrapolated from props
 * @return: ApplicantDetailRow Component
 */
export const ApplicantDetailRow = (props) => {
  const [globalState, globalActions] = useGlobal()
  const {
    saveTask,
    fetchTroopsTasks,
    saveRating,
    fetchTroopsRatings
  } = globalActions
  const { row, user } = props
  const {
    accounts,
    branch,
    uid,
    firstName,
    lastName,
    city,
    state,
    country,
    ratings,
    tasks,
    comments,
    about,
    experience
  } = row
  const personType = 'Applicant'
  const accts = accounts || []
  const ghAccount =
    accts.filter((acct) => acct.type === 'github')[0] || {}
  const ghAcctName = ghAccount.name || ''
  const ghCal =
    () => new GithubCalendar(`.calendar-${ uid }`, ghAcctName)

  const [ghCalLoaded, setGhCalLoaded] = useState(false)

  const handleTaskUpdate = (event, item) => {
    const obj = {
      uid: uid,
      task: {
        uid: '_:uid',
        'dgraph.type': 'Task',
        completed: true,
        completedDate: new Date(),
        ...item
      }
    }

    saveTask(obj)
      .then(() => fetchTroopsTasks(personType))
  }

  const handleRatingUpdate = (event, newValue, item) => {
    const value  = { ratingValue: newValue, ownerUid: uid }
    const formatted = {
      uid: uid,
      rating: {
        uid: '_:uid',
        'dgraph.type': 'Rating',
        ...item,
        ...value
      }
    }
    saveRating(formatted)
      .then(() => fetchTroopsRatings(personType))
  }


  const components = [
    {
      component: (
        <DetailRowHeader row={ row } />
      ),
      xs: 12
    },
    {
      classes: ' rb',
      component: (
        <div>prework component goes here</div>
      ),
      xs: 3
    },
    {
      classes: ' rb',
      component: (
        <TroopAbout
          aboutText={ about }
          experienceText={ experience }
          branchText={ branch }
        />
      ),
      xs: 3
    },
    {
      classes: ' rb',
      component: (
        <TaskList
          uid={ uid || '' }
          completedTasks={ tasks || [] }
          handleChange={ handleTaskUpdate }
          personType={ personType || '' }
          />
        ),
      xs: 3
    },
    {
      classes: '',
      component: (
        <RatingsList
          uid={ uid || '' }
          personType={ personType || '' }
          ratingValues={ ratings || [] }
          handleChange={ handleRatingUpdate }
        />
      ),
      xs: 3
    },
    {
      classes: '',
      component: (<hr />),
      xs: 12
    },
    {
      classes: ' rb',
      component: (
        <Comments
          comments={ comments }
          applicantUid={ uid }
          user={ user }
          personType={ personType }/>
      ),
      xs:5
    },
    {
      classes: '',
      component: (
        <div className={ `calendar calendar-responsive calendar-${ uid }` } />
      ),
      xs:7
    },

  ]

  useEffect(() => {
    if(!ghCalLoaded && ghAcctName !== '') {
      ghCal()
      setGhCalLoaded(true)
    }
  })

  return (
    <TroopDetailRow components={ components } />
  )
}
