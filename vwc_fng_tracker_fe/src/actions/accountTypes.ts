import { accountTypesQuery } from '../queries'
import { runQuery } from '../helpers'

export const fetchAccountTypes = async (store) => {
  store.setState({accountTypesStatus: 'LOADING'})
  const data = await runQuery(accountTypesQuery())
  const accountTypes = data['accountTypes'] || []

  store.setState({
    accountTypes: accountTypes,
    accountTypesStatus: 'LOADED',
    accountTypesLoaded: true
  })
  return accountTypes
}
