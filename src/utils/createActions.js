import { createAction } from '@reduxjs/toolkit'
import mapValues from 'lodash/mapValues'
import isPlainObject from 'lodash/isPlainObject'

export const requestActions = {
  request: 'REQUEST',
  success: 'SUCCESS',
  failure: 'FAILURE',
  reset: 'RESET',
}

/**
 *
 * @param prefix: name of action as a prefix
 * @param actions: action(Verb) of prefix action(Noun) name
 * @return action: full action type name Ex. "PREFIX_ACTION"
 */
export function createActions(prefix, actions = requestActions) {
  const object = mapValues(actions, (type) => {
    return `${prefix}_${type}`
  })

  const mappedAction = Object.keys(actions).reduce((prev, curr) => {
    if (!isPlainObject(prev)) {
      return {
        [prev]: createAction(object[prev]),
        [curr]: createAction(object[curr]),
      }
    }
    return { ...prev, [curr]: createAction(object[curr]) }
  })
  return mappedAction
}
