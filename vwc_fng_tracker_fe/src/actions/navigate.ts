import history from '../services/history'
export const navigate = (store, route) => {
  store.setState({history: route})
  history.push(route)
}
