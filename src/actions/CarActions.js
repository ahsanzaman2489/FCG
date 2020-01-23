import {toast} from "react-toastify";
import request from "../service";
import {FETCH_CAR_DETAILS, FETCHING_CAR_DETAILS,UPDATE_CAR_DETAILS} from "../const/actions";
import {carDetailQuery, carUpdateMutation} from "../service/queries";

export const fetchCarDetails = id => async dispatch => {
    dispatch({type: FETCHING_CAR_DETAILS});
    try {
        const {response} = await request(carDetailQuery, {id});

        if (response) dispatch({type: FETCH_CAR_DETAILS, payload: response.car});
    } catch (error) {
        toast(error, {
            type: "error"
        });
    }
};

export const updateCar = ({...params}) => async dispatch => {
    dispatch({type: FETCHING_CAR_DETAILS});
    console.log(params)
    try {
        const {response} = await request(carUpdateMutation, {...params});

        if (response) dispatch({type: UPDATE_CAR_DETAILS, payload: response.updateCar});

    } catch (error) {
        toast(error, {
            type: "error"
        });
    }
};
