import {
  FETCHING_CAR_DETAILS,
  FETCH_CAR_DETAILS,
  UPDATE_CAR_DETAILS,
  NO_CAR_FOUND
} from "../const/actions";

export default (state = { loading: false }, action) => {
  switch (action.type) {
    case NO_CAR_FOUND:
      return {
        loading: false
      };
    case FETCHING_CAR_DETAILS:
      return {
        ...state,
        loading: true
      };
    case FETCH_CAR_DETAILS:
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    case UPDATE_CAR_DETAILS:
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    default:
      return state;
  }
};
