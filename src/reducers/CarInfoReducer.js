import {
  FETCH_MAKE,
  FETCHING_CAR_INFO,
  FETCHING_CAR_INFO_DONE,
  FETCH_MODELS,
  FETCH_TRIM,
  CLEAR_ALL,
  NO_CAR_FOUND
} from "../const/actions";

export default (state = { loading: false }, action) => {
  switch (action.type) {
    case NO_CAR_FOUND:
      return {
        loading: false
      };
    case FETCHING_CAR_INFO:
      return {
        ...state,
        loading: true
      };
    case FETCHING_CAR_INFO_DONE:
      return {
        ...state,
        loading: false
      };
    case FETCH_MAKE:
      return {
        ...state,
        make: action.payload
      };
    case FETCH_MODELS:
      return {
        ...state,
        models: action.payload
      };
    case CLEAR_ALL:
      return {
        ...state,
        models: [],
        trim: []
      };
    case FETCH_TRIM:
      return {
        ...state,
        trim: action.payload
      };
    default:
      return state;
  }
};
