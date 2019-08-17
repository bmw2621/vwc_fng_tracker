import React, { useEffect } from 'react'
import { Account } from '../Account'
import { AccountForm } from '../AccountForm'
import { useGlobal } from '../../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const AccountsList = (props) => {

  const [globalState, globalActions] = useGlobal()
  const { doDelete, fetchApplicant, fetchAccountTypes } = globalActions
  const { accountTypesLoaded } = globalState

  const uiStyles = {
    listStyleType: 'none',
    padding: 0
  }

  const handleDelete = (uid) => {
    const data = {
      uid: props.applicantUid,
      ownsAccount: {
        uid: uid
      }
    }

    doDelete(data)
    fetchApplicant(props.applicantUid)
  }

  useEffect(()=> {
    if(!accountTypesLoaded) {
      fetchAccountTypes()
    }
  })

  const handleAdd = () => {
    globalActions.setState({showAccountForm: true})
  }

  const accounts = props.accounts || []

  const accountsList = accounts
    .map((account, index) => {
      return(
        <Account
          id={ account.uid }
          key={ `account-${account.uid}` }
          itemIndex={ index }
          accountName={ account.name }
          accountType={ account.type }
          onDelete={ (event) => handleDelete(account.uid) }
        />
      )
    })

  const accountForm = () => {
    return(
      <AccountForm
        applicantUid={ props.applicantUid }
        accountTypes={ globalState.accountTypes }
      />
    )
  }

  return (
    <div>
      <strong>Accounts</strong>&nbsp;
      <span onClick={ handleAdd }>
        <FontAwesomeIcon
          style={ {color: 'green'} }
          icon="plus-circle"
          size="lg"
        />
      </span>
      <ul style={ uiStyles }>
        { accountsList }
      </ul>
      { globalState.showAccountForm ? accountForm() : null }
    </div>
  )
}
