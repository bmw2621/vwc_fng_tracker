import {
  runQuery,
  runMutation
} from '../helpers'
import {
  doDelete
} from './doDelete'
import {
  troopsQuery
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

export const saveTroop =
  async (store: any, troop: any) => {
  const data = await runMutation(troop)
  return data
}

export const deleteTroop = (store, item) => {
  doDelete(store, item)
}
