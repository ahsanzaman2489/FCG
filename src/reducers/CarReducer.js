export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CAR_DETAILS":
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
