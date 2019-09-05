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
  troopGridCommentsQuery
} from '../queries'

export const fetchTroops =
  async (store: any, personType: string) => {
  const data = await runQuery(troopsQuery(personType))
  const troops = data['troops'] || []

  store.setState({
    troops: troops,
    troopsLoaded: true
  })
}

export const fetchTroopsTasks =
  async(store: any, personType: string) => {
  const data = await runQuery(troopGridTasksQuery(personType))
  const troopsTasks = data['troops']

  store.setState({
    troopsTasks: troopsTasks
  })
}

export const fetchTroopsComments =
  async(store: any, personType: string) => {
  const data = await runQuery(troopGridCommentsQuery(personType))
  const troopsComments = data['troops']

  store.setState({
    troopsComments: troopsComments
  })
}

export const fetchTroopsAccounts =
  async(store: any, personType: string) => {
  const data = await runQuery(troopGridAccountsQuery(personType))
  const troopsAccounts = data['troops']

  store.setState({
    troopsAccounts: troopsAccounts
  })
}

export const fetchTroopsRatings =
  async(store: any, personType: string) => {
  const data = await runQuery(troopGridRatingsQuery(personType))
  const troopsRatings = data['troops']

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
