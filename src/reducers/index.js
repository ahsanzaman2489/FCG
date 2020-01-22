import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import CarReducer from "./CarReducer";
import TaskReducer from "./TaskReducer";

export default combineReducers({
  CarReducer,
  TaskReducer,
  form: formReducer
});
