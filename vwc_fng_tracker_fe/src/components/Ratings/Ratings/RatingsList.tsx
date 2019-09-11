import React, { useEffect } from 'react'
import Rating from '@material-ui/lab/Rating'
import TypoGraphy from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import { useGlobal } from '../../../store'
import { BehaviorSubject, combineLatest } from 'rxjs'

export const RatingsList = (props) => {
  const {
    uid,
    personType,
    ratingValues,
    handleChange
  } = props
  const [globalState, globalActions] = useGlobal()
  const { ratingTypesLoaded, ratingTypes } = globalState
  const {
    fetchRatingTypes,
    fetchTroopsRatings,
    saveRating
  } = globalActions
  const blankRatingType = {
    ratingValue: 0,
    ratingTypeUid: '',
    'dgraph.type': 'Rating',
    ownerUid: uid
  }
  const rVals = ratingValues || []
  let ratings
  const ratingTypes$ = new BehaviorSubject(ratingTypes)
  const ratingValues$ = new BehaviorSubject(ratingValues)

  combineLatest(ratingTypes$, ratingValues$)
    .subscribe(([rts, rVals]) =>{
      ratings = rts
        .map(rt => {
          const matchRating = rVals
            .filter(sar => rt.name === sar.name)[0] || {}
          return {
            ...blankRatingType,
            ...{
              ratingTypeUid: rt.uid,
              name: rt.name,
              associatedWith: rt.associatedWith
            },
            ...matchRating
          }
        })
      })


  const ratingsList = ratings.map((rating, index) => {
    return (
      <Grid xs={ 6 } key={ `rating-${index}` }>
        <TypoGraphy component="legend">
          { rating.name }
        </TypoGraphy>
        <Rating
          id={ `rating-${index}` }
          name={ rating.name }
          value={ rating.ratingValue }
          onChange={
            (event, newValue) => handleChange(event, newValue, rating)
          }
          />
      </Grid>
    )
  })

  useEffect(() => {
    if(!ratingTypesLoaded) {
      fetchRatingTypes()
    }
  })

  return(
    <div>
      <strong>RATINGS</strong>
      <Grid container>
        { ratingsList }
      </Grid>
    </div>
  )
}
