import { toast } from "react-toastify";
import request from "../service";
import { FETCH_CAR_DETAILS, FETCHING_CAR_DETAILS } from "../const/actions";
import { carDetailQuery } from "../service/queries";

export const fetchCarDetails = id => async dispatch => {
  dispatch({ type: FETCHING_CAR_DETAILS });
  try {
    const { response } = await request(carDetailQuery, { id });

    if (response) dispatch({ type: FETCH_CAR_DETAILS, payload: response.car });
  } catch (error) {
    toast(error, {
      type: "error"
    });
  }
};
