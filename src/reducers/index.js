import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import CarReducer from "./CarReducer";

export default combineReducers({
  CarReducer,
  form: formReducer
});
