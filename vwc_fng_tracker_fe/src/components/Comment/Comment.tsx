import React, { useState } from 'react'
import { useGlobal } from '../../store'

export const Comment = (props) => {
  const applicantUid = props.applicantUid
  const [globalState, globalActions] = useGlobal()
  const comment = props.comment

  const localState = useState({
    editing: false,
    edited: comment.edited,
    text: comment.text,
    date: comment.date,
    commenterUid: comment.commenterUid,
    commenterFullName: comment.commenterFullName
  })

  return (
    <div className="comment">
    </div>
  )
}
