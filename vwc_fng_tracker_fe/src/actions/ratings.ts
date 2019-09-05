import { ratingTypesQuery, specificRatingTypesQuery } from '../queries'
import { runQuery, runMutation } from '../helpers'
import { doDelete } from './doDelete'
import { setState } from './setState'

export const fetchRatingTypes =
  async (store) => {
  const result = await runQuery(ratingTypesQuery())
  setState(store, { ratingTypes: result['ratingTypes'], ratingTypesLoaded: true })
}

export const fetchSpecificRatingTypes =
  async (store, associatedWith) => {
  const result =
    await runQuery(specificRatingTypesQuery(associatedWith))
  store.setState({
    ratingTypes: result['ratingTypes'],
    ratingTypesLoaded: true
  })
  return result
}

export const addRatingType =
  async (store, item) => {
  const mResult = await runMutation(item)
  fetchRatingTypes(store)
  return mResult
}

export const saveRatingType =
  async (store, item) => {
  const mResult = await runMutation(item)
  return mResult
}

export const fetchRatings =
  async (store, uid) => {
}

export const saveRating =
  async (store, item) => {
  const mResult = await runMutation(item)
  return mResult
}

export const deleteRatingType = (store, item) => {
  doDelete(store, item)
}
