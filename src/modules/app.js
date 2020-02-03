import { handleActions } from "redux-actions";
import { createSelector } from "reselect";
import * as mock from "../constants/mock.const";

// ==================================
// Selectors
// ==================================
export const dataSelector = createSelector(
  state => state.app,
  app => app.data
);

// ==================================
// Actions
// ==================================

// ==================================
// Action Handlers
// ==================================
const ACTION_HANDLERS = {};

// ==================================
// Reducer
// ==================================

const initialState = {
  data: { ...mock }
};

export default handleActions(ACTION_HANDLERS, initialState);
