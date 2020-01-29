import {
  FETCHING_CAR_TASK,
  FETCH_CAR_TASK,
  FETCHING_CAR_TASK_DONE,
  UPDATE_TASK,
  NO_CAR_FOUND
} from "../const/actions";

export default (state = { loading: false, tasks: null }, action) => {
  switch (action.type) {
    case NO_CAR_FOUND:
      return {
        loading: false
      };
    case FETCHING_CAR_TASK:
      return {
        loading: true
      };
    case FETCHING_CAR_TASK_DONE:
      return {
        ...state,
        loading: false
      };
    case FETCH_CAR_TASK:
      return {
        ...state,
        loading: false,
        tasks: action.payload
      };
    case UPDATE_TASK:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(item => {
          if (action.payload.id === item.id) {
            return {
              ...item,
              completed: action.payload.completed
            };
          }
          return item;
        })
      };
    default:
      return state;
  }
};
