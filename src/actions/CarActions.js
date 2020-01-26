import {toast} from "react-toastify";
import request from "../service";
import {
    FETCH_CAR_DETAILS,
    FETCHING_CAR_DETAILS,
    UPDATE_CAR_DETAILS,
    FETCHING_CAR_INFO,
    FETCH_MAKE,
    FETCH_MODELS,
    FETCH_TRIM,
    CLEAR_ALL, CLEAR_TRIM
} from "../const/actions";
import {carDetailQuery, carUpdateMutation, makeQuery, modelQuery, trimQuery} from "../service/queries";

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

export const fetchMake = (selectedMake, selectedModel) => async dispatch => {
    dispatch({type: FETCHING_CAR_INFO});
    try {
        const {response} = await request(makeQuery, {});

        if (response) {
            dispatch({type: FETCH_MAKE, payload: response.make});
        }

        if (selectedMake) {
            const modelResponse = await request(modelQuery, {make: selectedMake});
            if (modelResponse.response) dispatch({type: FETCH_MODELS, payload: modelResponse.response.model});

            if (selectedMake && selectedModel) {
                const trimResponse = await request(trimQuery, {make: selectedMake, model: selectedModel});
                if (trimResponse.response) dispatch({type: FETCH_TRIM, payload: trimResponse.response.trim});
            }
        }

    } catch (error) {
        toast(error, {
            type: "error"
        });
    }
};

export const fetchModel = (selectedMake) => async dispatch => {
    dispatch({type: FETCHING_CAR_INFO});
    try {
        const {response} = await request(modelQuery, {make: selectedMake});
        if (response) {
            dispatch({type: CLEAR_TRIM, payload: true});
            dispatch({type: FETCH_MODELS, payload: response.model})
        };

    } catch (error) {
        toast(error, {
            type: "error"
        });
    }
};

export const fetchTrim = (selectedMake, selectedModel) => async dispatch => {
    dispatch({type: FETCHING_CAR_INFO});
    try {
        const {response} = await request(trimQuery, {make: selectedMake, model: selectedModel});
        if (response) dispatch({type: FETCH_TRIM, payload: response.trim});

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