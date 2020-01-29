import { toast } from "react-toastify";
import request from "../service";
import {
  FETCH_CAR_DETAILS,
  FETCHING_CAR_DETAILS,
  FETCHING_CAR_DETAILS_DONE,
  UPDATE_CAR_DETAILS,
  FETCHING_CAR_INFO,
  FETCHING_CAR_INFO_DONE,
  FETCH_MAKE,
  FETCH_MODELS,
  FETCH_TRIM,
  CLEAR_ALL,
  NO_CAR_FOUND
} from "../const/actions";
import {
  carDetailQuery,
  carUpdateMutation,
  makeQuery,
  modelQuery,
  trimQuery
} from "../service/queries";

export const fetchCarDetails = (id, cb) => async dispatch => {
  dispatch({ type: NO_CAR_FOUND });
  dispatch({ type: FETCHING_CAR_DETAILS });
  try {
    const { response } = await request(carDetailQuery, { id });
    if (response) {
      if (response.car === null) {
        dispatch({ type: NO_CAR_FOUND });
      } else {
        dispatch({ type: FETCH_CAR_DETAILS, payload: response.car });
        if (cb) cb(id);
      }
    }
  } catch (error) {
    toast(error, {
      type: "error"
    });
  }
};

export const fetchMake = (selectedMake, selectedModel) => async dispatch => {
  dispatch({ type: FETCHING_CAR_INFO });
  try {
    const { response } = await request(makeQuery, {});

    if (response) {
      dispatch({ type: FETCH_MAKE, payload: response.make });
    }

    if (selectedMake) {
      const modelResponse = await request(modelQuery, { make: selectedMake });
      if (modelResponse.response) {
        dispatch({ type: FETCH_MODELS, payload: modelResponse.response.model });
        dispatch({ type: FETCHING_CAR_INFO_DONE });
      }

      if (selectedMake && selectedModel) {
        const trimResponse = await request(trimQuery, {
          make: selectedMake,
          model: selectedModel
        });
        if (trimResponse.response) {
          dispatch({ type: FETCH_TRIM, payload: trimResponse.response.trim });
          dispatch({ type: FETCHING_CAR_INFO_DONE });
        }
      } else {
        dispatch({ type: FETCHING_CAR_INFO_DONE });
      }
    } else {
      dispatch({ type: FETCHING_CAR_INFO_DONE });
    }
  } catch (error) {
    dispatch({ type: FETCHING_CAR_INFO_DONE });
    toast(error, {
      type: "error"
    });
  }
};

export const fetchModel = selectedMake => async dispatch => {
  dispatch({ type: FETCHING_CAR_INFO });
  try {
    const { response } = await request(modelQuery, { make: selectedMake });
    if (response) {
      dispatch({ type: CLEAR_ALL, payload: true });
      dispatch({ type: FETCH_MODELS, payload: response.model });
    }
    dispatch({ type: FETCHING_CAR_INFO_DONE });
  } catch (error) {
    dispatch({ type: FETCHING_CAR_INFO_DONE });
    toast(error, {
      type: "error"
    });
  }
};

export const fetchTrim = (selectedMake, selectedModel) => async dispatch => {
  dispatch({ type: FETCHING_CAR_INFO });
  try {
    const { response } = await request(trimQuery, {
      make: selectedMake,
      model: selectedModel
    });
    if (response) {
      dispatch({ type: FETCH_TRIM, payload: response.trim });
    }
    dispatch({ type: FETCHING_CAR_INFO_DONE });
  } catch (error) {
    dispatch({ type: FETCHING_CAR_INFO_DONE });
    toast(error, {
      type: "error"
    });
  }
};

export const updateCar = ({ ...params }) => async dispatch => {
  dispatch({ type: FETCHING_CAR_DETAILS });
  try {
    const { response } = await request(carUpdateMutation, { ...params });

    if (response)
      dispatch({ type: UPDATE_CAR_DETAILS, payload: response.updateCar });
    toast("car updated successfully", {
      type: "success"
    });
  } catch (error) {
    dispatch({ type: FETCHING_CAR_DETAILS_DONE });
    toast(error, {
      type: "error"
    });
  }
};
