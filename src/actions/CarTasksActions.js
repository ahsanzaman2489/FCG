import { toast } from "react-toastify";
import request from "../service";
import {
  FETCH_CAR_TASK,
  FETCHING_CAR_TASK,
  FETCHING_CAR_TASK_DONE,
  UPDATE_TASK
} from "../const/actions";
import {
  carTaskQuery,
  addTaskMutation,
  updateTaskMutation
} from "../service/queries";

export const fetchCarTasks = id => async dispatch => {
  dispatch({ type: FETCHING_CAR_TASK });
  try {
    const { response } = await request(carTaskQuery, { id });

    if (response) dispatch({ type: FETCH_CAR_TASK, payload: response.tasks });
  } catch (error) {
    toast(error, {
      type: "error"
    });
    dispatch({ type: FETCHING_CAR_TASK_DONE });
  }
};

export const addTask = ({ id, type, comment }) => async dispatch => {
  dispatch({ type: FETCHING_CAR_TASK });
  try {
    const results = await request(addTaskMutation, { id, type, comment });

    if (results.response) {
      const { response } = await request(carTaskQuery, { id });
      if (response) {
        dispatch({ type: FETCH_CAR_TASK, payload: response.tasks });
        toast("Task Created successfully", {
          type: "success"
        });
      }
    }
  } catch (error) {
    toast(error, {
      type: "error"
    });

    dispatch({ type: FETCHING_CAR_TASK_DONE });
  }
};

export const updateTask = ({ taskId, completed }) => async dispatch => {
  dispatch({ type: FETCHING_CAR_TASK });
  try {
    const result = await request(updateTaskMutation, {
      id: taskId,
      completed
    });

    if (result.response)
      dispatch({ type: UPDATE_TASK, payload: result.response.updateTask });

    toast("Task updated successfully", {
      type: "success"
    });
  } catch (error) {
    toast(error, {
      type: "error"
    });

    dispatch({ type: FETCHING_CAR_TASK_DONE });
  }
};
