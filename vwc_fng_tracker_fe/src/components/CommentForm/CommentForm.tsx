import React from 'react'
import { Grid, TextField, Button, Paper } from '@material-ui/core'
import { useGlobal } from '../../store'
import { useForm } from '../../hooks'

export const CommentForm = (props) => {
  const user = props.user
  const { comment, applicantUid, editing, onCancel } = props
  const [globalState, globalActions] = useGlobal()
  const { saveComment, fetchApplicant, setState } = globalActions

  const blankComment = {
    uid: '_:newComment',
    editing: false,
    edited: false,
    text: '',
    commenterName: user.name,
    commentDate: new Date()
  }

  const save = () => {
    const edited = values.uid != '_:newComment'
    const data = {
      uid: applicantUid,
      hasComment: {
        uid: values.uid,
        text: values.text,
        edited: edited,
        commenterName: comment.commenterName,
        commentDate: comment.commentDate
      }
    }
    doSaveComment(data)
  }

  const doSaveComment = (data) => {
    saveComment(data)
    fetchApplicant(applicantUid)
    setState({ currentComment: blankComment })
  }

  const { handleSubmit, handleChange, values } =
    useForm(save, globalState, 'currentComment', globalActions)

  return (
    <Grid className="commentForm" style={{marginBottom: 2}} container>
      <Paper>

      <form id="commentForm" onSubmit={ handleSubmit }>
        <Grid item xs={ 12 }>
            <label
              className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled"
              data-shrink="true"
              htmlFor="text">
              Comment Text
            </label>
            <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl MuiInputBase-multiline MuiInput-multiline">
              <textarea
                style={{maxWidth:800, minWidth: 800}}
                aria-invalid="false"
                className="MuiInputBase-input MuiInput-input MuiInputBase-inputMultiline MuiInput-inputMultiline"
                id="text"
                rows={ 6 }
                onChange={ handleChange }
                value={ values.text }
                />
              </div>

            </Grid>
            <Grid container style={{textAlign: 'right'}}>
        <Grid item xs={ 8 }>&nbsp;</Grid>
        <Grid item xs={ 2 }>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={ onCancel }>
            CANCEL
          </Button>
        </Grid>
        <Grid item xs={ 2 }>
          <Button
            variant="contained"
            size="small"
            color="primary"
            type="submit">
            SUBMIT
          </Button>
        </Grid>
      </Grid>
      </form>
    </Paper>
    </Grid>
  )
}
