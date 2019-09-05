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
    addCompletedTask,
    fetchTroopsTasks,
    saveRating,
    fetchTroopsRatings
  } = globalActions
  const { row, user } = props
  const {
		accounts,
    uid,
    firstName,
    lastName,
    city,
    state,
    country,
    ratings,
    tasks,
    comments,
    personType,
    about,
    priorExperience
  } = row
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
      hasCompletedTask: {
        uid: '_:uid',
        completed: true,
        dateCompleted: new Date(),
        ...item
      }
    }

    addCompletedTask(obj)
      .then(() => fetchTroopsTasks(personType))
  }

  const handleRatingUpdate = (event, newValue, item) => {
    const value  = { value: newValue, ownerUid: uid }
    const formatted = {
      uid: uid,
      hasRating: { uid: '_:uid', ...item, ...value }
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
          experienceText={ priorExperience }
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
