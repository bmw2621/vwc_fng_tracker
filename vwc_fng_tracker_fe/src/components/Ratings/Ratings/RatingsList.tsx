import React, { useEffect } from 'react'
import Rating from '@material-ui/lab/Rating'
import TypoGraphy from '@material-ui/core/Typography'
import { Box, Grid } from '@material-ui/core'
import { useGlobal } from '../../../store'

export const RatingsList = (props) => {
  const [globalState, globalActions] = useGlobal()
  const { selectedApplicant, ratingTypesLoaded, ratingTypes } = globalState
  const { fetchRatingTypes, saveRating } = globalActions
  const blankRatingType = {
    value: 0,
    ratingTypeUid: '',
    ownerUid: selectedApplicant.uid
  }

  const ratings = ratingTypes
    .filter(rt => rt.associatedWith === selectedApplicant.personType)
    .map(rt => {
    const applicantRatings = selectedApplicant.ratings || []
    const matchRating = applicantRatings
      .filter(sar => sar.ratingTypeUid === rt.uid)[0] || {}
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

  const handleChange = (event, newValue, item) => {
    const value  = { value: newValue, ownerUid: selectedApplicant.uid }
    const formatted = {
      uid: selectedApplicant.uid,
      hasRating: { uid: '_:uid', ...item, ...value }
    }
    saveRating(formatted)
  }

  const ratingsList = ratings.map((rating, index) => {
    return (
      <Box key={ `rating-${index}` }>
        <TypoGraphy component="legend">
          { rating.name }
        </TypoGraphy>
        <Rating
          id={ `rating-${index}` }
          name={ rating.name }
          value={ rating.value }
          onChange={ (event, newValue) => handleChange(event, newValue, rating) }
          />
      </Box>
    )
  })

  useEffect(() => {
    if(!ratingTypesLoaded) {
      fetchRatingTypes()
    }
  })

  return(
    <Grid container>
      <Grid item xs={ 12 }>
        { ratingsList }
      </Grid>
    </Grid>
  )
}
