import React, { useState } from 'react'
import { Grid, Button, Paper } from '@material-ui/core'
import { MarkdownEditor } from 'react-markdown-editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const CommentForm = (props) => {
  const {
    comment,
    handleCancel,
    handleSave
  } = props

  const [values, setValues] = useState(comment)

  const handleSubmit = (event) => {
    const edited = values.uid !== '_:newComment'
    setValues({ edited: edited })
    handleSave(values)
  }

  const handleChange = (content) => {
    setValues({ ...values, text: content })
  }

  return (
    <div>
      <form id="commentForm">
        <Grid container>
          <Grid item xs={ 12 } style={{marginBottom: 5}}>
          <MarkdownEditor
            aria-invalid="false"
            id="text"
            initialContent={ values.text }
            iconsSet="font-awesome"
            onContentChange={ handleChange }
            />
          </Grid>
          <Grid item xs={ 8 }>&nbsp;</Grid>
          <Grid item xs={ 4 } style={{ textAlign: 'right', alignItems: 'right' }}>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={ handleCancel }>
              CANCEL
            </Button>
            &nbsp;
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="button"
              onClick={ handleSubmit }
            >
              SUBMIT
            </Button>
            <br/>
            <br/>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
