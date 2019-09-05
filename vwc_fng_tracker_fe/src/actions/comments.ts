import { runMutation } from '../helpers'

const saveComment = async (store, comment) => {
  const result = await runMutation(comment)
  return result
}

export { saveComment }
