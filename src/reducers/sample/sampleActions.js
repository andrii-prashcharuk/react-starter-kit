// @flow
import sampleAPI from '../../utils/api';
import { getErrorFromRequest } from '../../utils';
import type { GetState, DataItem } from '../../constants';

type GetDataRequestAction = {
    type: 'GET_DATA_REQUEST',
};

export function getDataRequest(): GetDataRequestAction {
    return {
        type: 'GET_DATA_REQUEST',
    };
}

type GetDataSuccessAction = {
    type: 'GET_DATA_SUCCESS',
    payload: DataItem[],
};

export function getDataSuccess(data: DataItem[]): GetDataSuccessAction {
    return {
        type: 'GET_DATA_SUCCESS',
        payload: data,
    };
}

type GetDataFailureAction = {
    type: 'GET_DATA_FAILURE',
    payload: string,
};

export function getDataFailure(error: string): GetDataFailureAction {
    return {
        type: 'GET_DATA_FAILURE',
        payload: error,
    };
}

export type SampleAction =
    GetDataRequestAction |
    GetDataSuccessAction |
    GetDataFailureAction;

type Dispatch = (action: SampleAction) => any;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export function getAllData(): ThunkAction {
    return (dispatch) => {
        dispatch(getDataRequest());

        return sampleAPI.getAllData()
            .then(request => dispatch(getDataSuccess(request.data)))
            .catch(request => dispatch(getDataFailure(getErrorFromRequest(request))));
    };
}

export function getFilteredData(filter: string): ThunkAction {
    return (dispatch) => {
        dispatch(getDataRequest());

        return sampleAPI.getFilteredData(filter)
            .then(request => dispatch(getDataSuccess(request.data)))
            .catch(request => dispatch(getDataFailure(getErrorFromRequest(request))));
    };
}
