import React, { useEffect, useState } from 'react'
import { Account } from '../Account'
import { AccountForm } from '../AccountForm'
import { useGlobal } from '../../store'
import { BehaviorSubject } from 'rxjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const AccountsList = (props) => {
  const { personType, ownerUid, accounts } = props
  const [globalState, globalActions] = useGlobal()
  const {
    doDelete,
    fetchTroopsAccounts,
    fetchAccountTypes,
    saveAccount
  } = globalActions
  const { accountTypesLoaded, accountTypes } = globalState

  const [formVisible, setFormVisible] = useState(false)

  const handleDelete = (event, uid) => {
    const data = {
      uid: ownerUid,
      account: {
        uid: uid
      }
    }

    doDelete(data)
    fetchTroopsAccounts(personType)
  }

  const handleAdd = (event) => {
    if(!accountTypesLoaded) {
      fetchAccountTypes()
        .then(() => setFormVisible(true))
    } else {
      setFormVisible(true)
    }
  }

  const handleCancel = (event) => {
    setFormVisible(false)
  }

  const handleSave = (item) => {
    saveAccount(item)
    .then(() => {
      fetchTroopsAccounts(personType)
        .then(() => setFormVisible(false))
    })
  }

  const accts = accounts || []
  const accounts$ = new BehaviorSubject(accts)
  let accountsList

  accounts$.subscribe((_accts) => {
    accountsList = _accts
      .map((account, index) => {
        const accountType = account.accountType[0] || {}
        const accountTypeName = accountType.name || ''
        return(
          <Account
            id={ account.uid }
            key={ `account-${account.uid}` }
            itemIndex={ index  || []}
            accountName={ account.name }
            accountType={ accountTypeName }
            onDelete={ (event) => handleDelete(event, account.uid) }
          />
        )
      })
  })

  const accountForm = () => (
    <AccountForm
      applicantUid={ ownerUid }
      accountTypes={ accountTypes }
      handleCancel={ handleCancel }
      handleSave={ handleSave }
    />
  )

  return (
    <span>
      &nbsp;<strong>ACCOUNTS:</strong>&nbsp;
        { accountsList }
        { formVisible && accountForm() }
        { !formVisible && (
          <span onClick={ handleAdd }>
            &nbsp;
            <FontAwesomeIcon
              style={ {color: 'green'} }
              icon="plus-circle"
            />
          </span>
        ) }
    </span>
  )
}
