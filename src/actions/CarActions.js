import {toast} from "react-toastify";
import request from "../service";
import {
    FETCH_CAR_DETAILS,
    FETCHING_CAR_DETAILS,
    UPDATE_CAR_DETAILS,
    FETCHING_CAR_INFO,
    FETCH_MAKE
} from "../const/actions";
import {carDetailQuery, carUpdateMutation, makeQuery} from "../service/queries";

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

export const fetchMake = () => async dispatch => {
    dispatch({type: FETCHING_CAR_INFO});
    try {
        const {response} = await request(makeQuery, {});

        if (response) dispatch({type: FETCH_MAKE, payload: response.car});
    } catch (error) {
        toast(error, {
            type: "error"
        });
    }
};


export const updateCar = ({...params}) => async dispatch => {
    dispatch({type: FETCHING_CAR_DETAILS});
    try {
        const {response} = await request(carUpdateMutation, {...params});

        if (response) dispatch({type: UPDATE_CAR_DETAILS, payload: response.updateCar});
        toast("car updated successfully", {
            type: "success"
        });
    } catch (error) {
        toast(error, {
            type: "error"
        });
    }
};
