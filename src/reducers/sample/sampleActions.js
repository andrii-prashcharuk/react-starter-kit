import sampleAPI from '../../utils/api';
import { getErrorFromRequest } from '../../utils';
import actionTypes from '../../constants/actionTypes';

const {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
} = actionTypes;

export function getDataRequest() {
    return {
        type: GET_DATA_REQUEST,
    };
}
export function getDataSuccess(json) {
    return {
        type: GET_DATA_SUCCESS,
        payload: json,
    };
}
export function getDataFailure(json) {
    return {
        type: GET_DATA_FAILURE,
        payload: json,
    };
}

export function getAllData() {
    return (dispatch) => {
        dispatch(getDataRequest());

        return sampleAPI.getAllData()
            .then(request => dispatch(getDataSuccess(request.data)))
            .catch(request => dispatch(getDataFailure(getErrorFromRequest(request))));
    };
}

export function getFilteredData(filter) {
    return (dispatch) => {
        dispatch(getDataRequest());

        return sampleAPI.getFilteredData(filter)
            .then(request => dispatch(getDataSuccess(request.data)))
            .catch(request => dispatch(getDataFailure(getErrorFromRequest(request))));
    };
}
