import { runMutation } from '../helpers'

const saveAccount = async (store, data) => {
  const result = await runMutation(data)
  return result
}

export { saveAccount }
