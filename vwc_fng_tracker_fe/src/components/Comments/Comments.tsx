import React, { useState } from 'react'
import { useGlobal } from '../../store'
import { Grid } from '@material-ui/core'
import './Comments.scss'
import { Comment } from '../Comment'
import { CommentForm } from '../CommentForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BehaviorSubject } from 'rxjs'

export const Comments = (props) => {
  const {
    applicantUid,
    personType,
    user,
    comments,
    handleDelete
  } = props
  const [globalState, globalActions] =
    useGlobal()
  const {
    saveComment,
    fetchTroopsComments,
    doDelete
  } = globalActions

  const [formVisible, setFormVisible] =
    useState(false)

  const comments$ =
    new BehaviorSubject(comments)

  let list

  comments$.subscribe(() => {
    const _c = comments || []
    list = _c
      .map((comment, index) => {
        return (
          <Comment
            key={ `comment-${ index }` }
            comment={ comment }
            applicantUid={ applicantUid }
            user={ user }
            personType={ personType }
            handleDelete={ handleDelete }/>
        )
      })
  })

  const blankComment = {
    uid: '_:newComment',
    edited: false,
    text: '',
    author: user['name'],
    commentDate: new Date(),
    'dgraph.type': 'Comment'
  }

  const handleNew = (event) => {
    setFormVisible(true)
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
        comment={ blankComment }
        handleCancel={ handleCancel }
        handleSave={ handleSave }
      />
    )
  }

  return (
    <div className="commentsOuterContainer">
      <strong>
        { comments.length } COMMENT{ comments.length === 1 ? '' : 'S'}
        </strong>
        {!formVisible && (
          <span onClick={ handleNew }>
            &nbsp; &nbsp; &nbsp;
            <FontAwesomeIcon
              style={ {color: 'green', cursor: 'hand'} }
              icon="plus-circle"
              size="lg"
            />
          </span>
        )}
      <br/>
      <div className="commentsContainer">
        { formVisible && commentForm() }
        { list }
      </div>
    </div>
  )
}
