import React from 'react'
import useGlobalHook from 'use-global-hook'
import * as actions from '../actions'

const initialState = {
  account_types: [],
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
}

export const useGlobal = useGlobalHook(React, initialState, actions)
