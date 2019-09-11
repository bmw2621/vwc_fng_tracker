import { runMutation } from '../helpers'

export const saveAccount = async (store, data) => {
  const result = await runMutation(data)
  return result
}
