import {FETCH_MAKE, FETCHING_CAR_INFO, FETCH_MODELS, FETCH_TRIM, CLEAR_ALL, CLEAR_TRIM} from "../const/actions";

export default (state = {loading: false}, action) => {
    switch (action.type) {
        case FETCHING_CAR_INFO:
            return {
                ...state,
                loading: true
            };
        case FETCH_MAKE:
            return {
                ...state,
                loading: false,
                make: action.payload
            };
        case FETCH_MODELS:
            return {
                ...state,
                loading: false,
                models: action.payload
            };
        case CLEAR_TRIM:
            console.log(action)
            return {
                ...state,
                loading: false,
                trim: []
            };
        case FETCH_TRIM:
            return {
                ...state,
                loading: false,
                trim: action.payload
            };
        default:
            return state;
    }
};
