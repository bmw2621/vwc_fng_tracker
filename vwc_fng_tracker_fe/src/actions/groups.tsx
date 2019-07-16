import { groupsQuery } from '../queries'
import { runQuery } from '../helpers'

export function fetchGroups(store) {
  return runQuery(groupsQuery())
  .then(res => res.json())
  .then((json) => {
      store.setState({ groups: json.data.groups, groupsLoaded: true })
    })
}
