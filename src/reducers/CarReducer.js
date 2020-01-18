import { FETCHING_CAR_DETAILS, FETCH_CAR_DETAILS } from "../const/actions";

export default (state = { loading: false }, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
