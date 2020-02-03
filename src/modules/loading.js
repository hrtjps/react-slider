import {handleActions} from "redux-actions";
import {createSelector} from "reselect";
import {chain, isNil, get} from "lodash";

import {pending, fulfilled, rejected} from "../helpers";
import * as actions from "./actions";

const initialState = {};

/**
 * Selectors
 */

export const loadingReducerSelector = state => state.loading;

export const isLoading = actionCreator =>
  createSelector(
    loadingReducerSelector,
    loadingReducer => {
      const data = loadingReducer[actionCreator.toString()];

      return !isNil(data) && data.loading;
    }
  );

export const wasActionDispatchedSuccessfully = actionCreator =>
  createSelector(
    loadingReducerSelector,
    loadingReducer => {
      const data = loadingReducer[actionCreator.toString()];

      return !isNil(data) && data.loading && !data.error;
    }
  );

export const getErrorMessage = actionCreator =>
  createSelector(
    loadingReducerSelector,
    loadingReducer => get(loadingReducer[actionCreator.toString()], "error")
  );

/**
 * Action Handlers
 */

const ACTION_HANDLERS = {
  ...chain(actions)
    .mapKeys(actionName => pending(actionName))
    .mapValues(actionName => state => ({
      ...state,
      [actionName]: {
        loading: true,
        error: null,
      },
    }))
    .value(),
  ...chain(actions)
    .mapKeys(actionName => fulfilled(actionName))
    .mapValues(actionName => state => ({
      ...state,
      [actionName]: {
        loading: false,
        error: null,
      },
    }))
    .value(),
  ...chain(actions)
    .mapKeys(actionName => rejected(actionName))
    .mapValues(actionName => (state, action) => {
      return {
        ...state,
        [actionName]: {
          loading: false,
          error: get(action.payload.response, "data.message"),
        },
      };
    })
    .value(),
};

/**
 * Reducer
 */

export default handleActions(ACTION_HANDLERS, initialState);
