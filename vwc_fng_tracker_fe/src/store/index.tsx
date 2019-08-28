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
  currentComment: {
    editing: false,
    applicantUid: '',
    commenterName: '',
    uid: '_:newComment',
    text: ''
  },
  showAccountForm: false,
  taskListTypes: [],
  currentTaskListType: {
    uid: '_:newTaskListType',
    name: '',
    editing: false,
    type: 'TaskListType',
    associatedWith: '',
    hasTaskTypes: []
  },
  taskListTypesLoaded: false,
  currentTaskType: {
    uid: '_:newTaskType',
    ownerUid: '',
    name: '',
    editing: false,
    type: 'TaskType',
    order: 0,
    associatedWith: ''
  },
  currentTaskList: {
    uid: '_:newTaskList',
    name: '',
    editing: false,
    type: 'TaskList',
    associatedWith: '',
    taskListType: '',
    tasks: []
  },
  taskListsLoaded: false,
  tasks: [],
  currentTask: {
    uid: '_:newTask',
    name: '',
    type: 'Task',
    ownerUid: '',
    taskType: '',
    completed: false,
    dateCompleted: null,
    associatedWith: ''
  },
  tasksLoaded: false,
  showTaskListForm: false,
  showTaskListTypeForm: false,
  showTaskTypeForm: false,
  associatedTasks: [],
  applicantTasks: [],
  ratingTypes: [],
  ratingTypesLoaded: false,
  ratings: []
}

export const useGlobal = useGlobalHook(React, initialState, actions)
