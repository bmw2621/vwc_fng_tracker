import { runMutation } from '../helpers'

const saveComment = (store, comment) => {
  runMutation(comment)
}

export { saveComment }
