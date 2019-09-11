import {
  runQuery,
  runMutation
} from '../helpers'
import {
  doDelete
} from './doDelete'
import {
  troopsQuery,
  troopGridTasksQuery,
  troopGridAccountsQuery,
  troopGridRatingsQuery,
  troopGridCommentsQuery,
  troopGridTaskTypesQuery
} from '../queries'
import { BehaviorSubject } from 'rxjs'

export const fetchTroops =
  async (store: any, personType: string) => {
  const data = await runQuery(troopsQuery(personType))
  const troops = data['troops'] || []

  store.setState({
    troops: troops,
    troopsLoaded: true
  })
  return troops
}

export const fetchTroopsTasks =
  async(store: any, personType: string) => {
  const data = await runQuery(troopGridTasksQuery(personType))
  const troopsTasks = data['troops']

  store.setState({
    troopsTasks: troopsTasks
  })
  return troopsTasks
}

export const fetchTroopsTaskTypes =
  async(store: any, personType: string) => {
  const data = await runQuery(troopGridTaskTypesQuery())
  const troopsTaskTypes = data['taskTypes'] || []
  const ttt = troopsTaskTypes
    .filter(taskType => taskType.associatedWith === personType)
  store.setState({
    troopsTaskTypesLoaded: true,
    troopsTaskTypes: ttt
  })
  return ttt
}

export const fetchTroopsComments =
  async (store: any, personType: string) => {
  const data = await runQuery(troopGridCommentsQuery(personType))
  const troopsComments = data['troops']

  store.setState({
    troopsComments: troopsComments
  })
  return troopsComments
}

export const fetchTroopsAccounts =
  async (store: any, personType: string) => {
  const data = await runQuery(troopGridAccountsQuery(personType))
  const troopsAccounts = data['troops']

  store.setState({
    troopsAccounts: troopsAccounts
  })
}

export const fetchTroopsRatings =
  async(store: any, personType: string) => {
  const data = await runQuery(troopGridRatingsQuery(personType))
  const troopsRatings = await data['troops']

  store.setState({
    troopsRatings: troopsRatings
  })
}

export const saveTroop =
  async (store: any, troop: any) => {
  const data = await runMutation(troop)
  return data
}

export const deleteTroop = (store, item) => {
  doDelete(store, item)
}

export const deleteTroopComment = (store, item) => {
  return doDelete(store, item)
}
