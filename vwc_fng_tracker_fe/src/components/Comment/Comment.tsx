import React from 'react'
import { useGlobal } from '../../store'
import {
  Grid,
  Button,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardHeader
} from '@material-ui/core'
import  TypoGraphy from '@material-ui/core/Typography'
import ReactMarkdown from 'react-markdown'
import { CommentForm } from '../CommentForm'
import moment from 'moment'

export const Comment = (props) => {
  const comment = props.comment
  const applicantUid = props.applicantUid
  const user = props.user
  const [globalState, globalActions] = useGlobal()
  const { setState, getState, doDelete, fetchApplicant } = globalActions
  const { currentComment } = globalState
  let showForm =
    comment.editing || comment.uid === currentComment.uid

  const handleEdit = (event) => {
    comment.editing = true
    setState({currentComment: comment})
  }

  const handleDelete = (event) => {
    const data = {
      uid: applicantUid,
      hasComment: {
        uid: comment.uid
      }
    }

    doDelete(data)
    fetchApplicant(applicantUid)
  }

  const blankComment = {
    uid: '_:newComment',
    editing: false,
    edited: false,
    text: '',
    commenterName: user.name,
    commentDate: new Date()
  }

  const handleCancel = (event) => {
    setState({currentComment: blankComment})
    showForm = false
  }

  const showCommentForm = () => {
    return (
      <CommentForm
        applicantUid={ applicantUid }
        comment={ comment }
        editing={ true }
        onCancel={ handleCancel}
        user={ user }
      />
    )
  }

  const showComment = () => {
    return (
      <Grid className="comment" container>
        <Grid item xs={12} style={{marginBottom: 0, paddingBottom: 0}}>
          <Card style={{fontSize: 0.5, marginBottom: 10}}>
            <Grid container>
              <Grid item xs={ 8 }>
                <CardContent style={{paddingBottom: 0}}>
                  <TypoGraphy color="primary">{ comment.commenterName }</TypoGraphy> <em>commented on</em> { moment(comment.commentDate).format('MMMM Do YYYY, h:mm:ss a') }
                </CardContent>
              </Grid>
              <Grid item xs={ 4 } style={{textAlign: 'right', paddingRight: 0}}>
                <CardActions style={{textAlign: 'right'}}>
									<Button size="small" color="primary" onClick={ handleEdit }>Edit</Button>
									<Button size="small" color="secondary" onClick={ handleDelete }>Delete</Button>
                </CardActions>
              </Grid>
              <Grid item xs={ 12 }>
                <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
                  <ReactMarkdown source={ comment.text } />
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    )
  }
  return showForm ? showCommentForm() : showComment()
}
