'use strict';
import sampleAPI from '../../utils/sampleAPI';
import actionTypes from '../../constants/actionTypes';

const {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
  } = actionTypes;

export function getDataRequest() {
  return {
    type: GET_DATA_REQUEST
  };
}
export function getDataSuccess(json) {debugger;
  return {
    type: GET_DATA_SUCCESS,
    payload: json
  };
}
export function getDataFailure(json) {
  return {
    type: GET_DATA_FAILURE,
    payload: json
  };
}
/**
 * ## get all available data
 */
export function getAllData() {
  return dispatch => {
    dispatch(getDataRequest());

    return sampleAPI.getAllData()
      .then((data) => dispatch(getDataSuccess(data)))
      .catch(({responseJSON}) => dispatch(getDataFailure(responseJSON)));
  };
}
/**
 * ## get filtered data
 */
export function getFilteredData(filter) {
  return dispatch => {
    dispatch(getDataRequest());

    return sampleAPI.getFilteredData(filter)
      .then((data) => dispatch(getDataSuccess(data)))
      .catch(({responseJSON}) => dispatch(getDataFailure(responseJSON)));
  };
}
