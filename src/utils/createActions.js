import { createAction } from "@reduxjs/toolkit";
import mapValues from "lodash/mapValues";

export const requestActions = {
  request: "REQUEST",
  success: "SUCCESS",
  failure: "FAILURE",
};

export function createActions(prefix, actions) {
  const object = mapValues(actions, (type) => {
    return `${prefix}_${type}`;
  });

  const mappedAction = {
    request: createAction(object.request),
    success: createAction(object.success),
    failure: createAction(object.failure),
  };
  return mappedAction
}
