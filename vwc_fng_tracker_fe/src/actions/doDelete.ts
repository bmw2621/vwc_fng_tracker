import { runDelete } from '../helpers'

export const doDelete = async (store, data) => {
  const response = await runDelete(data)
  return response
}
