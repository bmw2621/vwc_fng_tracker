import { runMutation } from '../helpers'

const saveAccount = (store, data) => {
  runMutation(data)
}

export { saveAccount }
