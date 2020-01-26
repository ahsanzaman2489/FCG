import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import CarReducer from "./CarReducer";
import TaskReducer from "./TaskReducer";
import CarInfoReducer from "./CarInfoReducer";

export default combineReducers({
  CarReducer,
  TaskReducer,
  CarInfoReducer,
  form: formReducer
});
