import React from 'react'
import { useGlobal } from '../../store'
import { Grid } from '@material-ui/core'
import { Comment } from '../Comment'
import { CommentForm } from '../CommentForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Comments = (props) => {
  const applicantUid = props.applicantUid
  const user = props.user
  const comments = props.comments || []
  const [globalState, globalActions] = useGlobal()
  const { setState } = globalActions
  const { currentComment } = globalState

  let showForm =
    currentComment.editing && currentComment.uid === '_:newComment'

  const commentsList = comments.map((comment, index) => {
    return (
      <Comment
        key={ `comment-${ index }` }
        comment={ comment }
        applicantUid={ applicantUid }
        user={ user }
      />)
  })

  const blankComment = {
    uid: '_:newComment',
    editing: false,
    edited: false,
    text: '',
    date: new Date(),
    commenterName: user['name'],
    commentDate: new Date()
  }

  const handleNew = (event) => {
    setState({currentComment: Object.assign(blankComment, {editing: true})})
    showForm = true
  }

  const handleCancel = (event) => {
    setState({currentComment: blankComment})
    showForm = false
  }

  const showCommentForm = () => {
    return (
      <CommentForm
        applicantUid={ applicantUid }
        comment={ currentComment }
        editing={ false }
        onCancel={ handleCancel }
        user={ user }
      />
    )
  }

  const dontShowCommentForm = () => {
    return (
      <Grid container>
        <Grid item xs={ 12 } style={{textAlign: 'right'}}>
          <span onClick={ handleNew }>
            <FontAwesomeIcon
              style={ {color: 'green'} }
              icon="plus-circle"
              size="lg"
            />
          </span>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid className="commentsComponent" container>
      <Grid item xs={12}><h3>Comments</h3></Grid>
      <Grid item xs={ 12 } className="comments">
        { commentsList }
      </Grid>
      { showForm ? showCommentForm() : dontShowCommentForm() }
    </Grid>
  )
}
