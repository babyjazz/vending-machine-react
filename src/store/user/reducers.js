import { combineReducers } from '@reduxjs/toolkit'
import { createActions } from 'utils/createActions'
import { createMetaReducer } from 'utils/createMetaReducer'

export const listUserAction = createActions('LIST_USER')

export const userReducer = combineReducers({
  lists: createMetaReducer(listUserAction),
  // customReducerCase: createMetaReducer(listUserAction, {...initialState, customValue: false}, {
  //   [listUserAction.success]: (state) => {
  //     return {
  //       ...state,
  //       ...initialState,
  //       meta: { ...initialState.meta, isRequesting: true },
  //       data: 'custom data only for success case'
  //     }
  //   },
  // }),
  // customKey: createReducer({...initialValue}, {
  //   [customAction]: (state, action) => {
  //     return {...state, value: action.payload}
  //   }
  // })
})
