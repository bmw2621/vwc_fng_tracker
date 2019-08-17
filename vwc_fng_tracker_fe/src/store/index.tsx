import React from 'react'
import useGlobalHook from 'use-global-hook'
import * as actions from '../actions'

const initialState = {
  accountTypes: [],
  applicants: [],
  applicantsLoaded: false,
  applicantsListStatus: 'EMPTY',
  groups: [],
  groupsLoaded: false,
  groupsStatus: 'EMPTY',
  history: '',
  selectedApplicant: {},
  selectedApplicantLoaded: false,
  selectedApplicantListStatus: 'EMPTY',
  newAccount: {
    applicantUid: '',
    uid: '_:a',
    accountType: '',
    name: ''
  },
  showAccountForm: false,
}

export const useGlobal = useGlobalHook(React, initialState, actions)
