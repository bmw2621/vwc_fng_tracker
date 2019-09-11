import React from 'react'
import { AccountsList } from '../'
export const DetailRowHeader = (props) => {
  const {
    firstName,
    lastName,
    city,
    state,
    country,
    uid,
    accounts
  } = props.row

  return(
    <div>
      <strong>
        { firstName } { lastName } from { city }, { state }, { country }<br /><AccountsList ownerUid={ uid } accounts={ accounts || [] } />
      </strong>
      <hr />
    </div>
  )
}
