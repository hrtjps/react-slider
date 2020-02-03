import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import appReducer from "../modules/app";
import loadingReducer from "../modules/loading";

export const makeRootReducer = asyncReducers => {
  const reducers = {
    router: routerReducer,
    app: appReducer,
    loading: loadingReducer,

    ...asyncReducers
  };
  return combineReducers(reducers);
};

export default makeRootReducer;
