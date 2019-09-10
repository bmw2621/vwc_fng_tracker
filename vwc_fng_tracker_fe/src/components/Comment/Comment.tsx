import React, { useState } from 'react'
import { useGlobal } from '../../store'
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core'
import  TypoGraphy from '@material-ui/core/Typography'
import ReactMarkdown from 'react-markdown'
import { CommentForm } from '../CommentForm'
import moment from 'moment'

export const Comment = (props) => {
  const {
    comment,
    applicantUid,
    user,
    personType
  } = props
  const [formVisible, setFormVisible] = useState(false)
  const [globalState, globalActions] = useGlobal()
  const { saveComment, fetchTroopsComments, doDelete } = globalActions
  const handleEdit = (event) => {
    setFormVisible(true)
  }

  const blankComment = {
    uid: '_:newComment',
    editing: false,
    edited: false,
    text: '',
    author: user.name,
    commentDate: new Date()
  }

  const handleDelete = (event) => {
    const item = {
      uid: applicantUid,
      comment: {
        uid: comment.uid
      }
    }
    doDelete(item)
      .then(() => fetchTroopsComments(personType))
  }

  const handleCancel = (event) => {
    setFormVisible(false)
  }

  const handleSave = (values) => {
    const data = {
      uid: applicantUid,
      comment: {
        uid: values.uid,
        text: values.text,
        edited: values.edited,
        author: values.author,
        commentDate: values.commentDate
      }
    }

    saveComment(data)
      .then(() => {
        fetchTroopsComments(personType)
        setFormVisible(false)
      })
  }

  const commentForm = () => {
    return (
      <CommentForm
        applicantUid={ applicantUid }
        comment={ comment }
        handleCancel={ handleCancel }
        handleSave={ handleSave }
        user={ user }
      />
    )
  }

  const commentItem = () => {
    return (
      <div>
        <Card style={{ fontSize: 0.5, marginBottom: 10 }}>
          <Grid container>
            <Grid item xs={ 9 }>
              <CardContent style={{paddingBottom: 0}}>
                <TypoGraphy color="primary">
                  { comment.author }
                </TypoGraphy>
                <small>commented on&nbsp;
                  <strong>
                    { moment(comment.commentDate).format('MMMM Do YYYY, h:mm:ss a') }
                  </strong>
                  { comment.edited ? ( <em> (edited)</em>) : ('') }
                </small>
              </CardContent>
            </Grid>
            <Grid item xs={ 2 } style={{ textAlign: 'right', alignItems: 'right' }}>
              <CardActions style={{ textAlign: 'right', alignItems: 'right', paddingRight: 20 }}>
                <Button size="small" color="primary" onClick={ handleEdit }>Edit</Button>
                <Button size="small" color="secondary" onClick={ handleDelete }>Delete</Button>
              </CardActions>
            </Grid>
            <Grid item xs={ 11 }>
              <CardContent style={{paddingTop: 0, paddingBottom: 0}}>
                <ReactMarkdown source={ comment.text } />
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </div>
    )
  }

  return formVisible ? commentForm() : commentItem()
}
