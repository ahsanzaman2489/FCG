import {
  FETCHING_CAR_TASK,
  FETCH_CAR_TASK,
  FETCHING_CAR_TASK_DONE,
  UPDATE_TASK
} from "../const/actions";

export default (state = { loading: false, tasks: null }, action) => {
  switch (action.type) {
    case FETCHING_CAR_TASK:
      return {
        ...state,
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
      const newTasks = state.tasks.map(item => {
        if (action.payload.id === item.id) {
          item.completed = action.payload.completed;
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        tasks: newTasks
      };
    default:
      return state;
  }
};
