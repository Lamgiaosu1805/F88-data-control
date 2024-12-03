import { combineReducers } from "redux";
import { default as authentication } from "./authentication";
import { default as loading } from "./loading";
const rootReducer = combineReducers({
  authentication,
  loading,
});

export default rootReducer;
