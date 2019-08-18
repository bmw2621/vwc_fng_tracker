import React from 'react'
import { useGlobal } from '../../store'
import { Grid } from '@material-ui/core'
import { Comment } from '../Comment'


export const Comments = (props) => {
  const applicantUid = props.applicantUid
  const comments = props.comments || []
  const [globalState, globalActions] = useGlobal()

  const commentsList = comments.map((comment, index) => {
    return (
      <Comment
        key={ `comment-${ comment.index }` }
        comment={ comment }
        applicantUid={ applicantUid }
      />)
  })

  return (
    <Grid className="commentsComponent" container>
      <div className="comments">
        { commentsList }
      </div>
    </Grid>
  )
}
