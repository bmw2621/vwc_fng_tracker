import { groupsQuery } from '../queries'
import { runQuery } from '../helpers'

export const fetchGroups = async (store) => {
  store.setState({ groupsStatus: 'LOADING' })
  const data = await runQuery(groupsQuery())
  const groups = data['groups'] || []
  store.setState({
    groups: groups,
    groupsLoaded: true,
    groupsStatus: 'LOADED'
  })
}
