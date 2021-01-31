// @flow
import type { Effect, Saga } from 'redux-saga';
import {
    all,
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';
import sampleAPI from '../../utils/api';
import { getErrorFromRequest } from '../../utils';
import type { DataItem } from '../../types';

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

type GetAllDataAction = {
    type: 'GET_ALL_DATA_REQUEST',
};

export function getAllData(): GetAllDataAction {
    return {
        type: 'GET_ALL_DATA_REQUEST',
    };
}

export function* getAllDataRequest(): Saga<void> {
    yield put(getDataRequest());
    try {
        const { data }: AxiosSagaResult<DataItem[]> = yield call(sampleAPI.getAllData);
        yield put(getDataSuccess(data));
    } catch (error) {
        yield put(getDataFailure(getErrorFromRequest(error)));
    }
}

type GetFilteredDataAction = {
    type: 'GET_FILTERED_DATA_REQUEST',
    payload: string,
};

export function getFilteredData(filter: string): GetFilteredDataAction {
    return {
        type: 'GET_FILTERED_DATA_REQUEST',
        payload: filter,
    };
}

export function* getFilteredDataRequest({ payload: filter }: GetFilteredDataAction): Saga<void> {
    yield put(getDataRequest());
    try {
        const { data }: AxiosSagaResult<DataItem[]> = yield call(sampleAPI.getFilteredData, filter);
        yield put(getDataSuccess(data));
    } catch (error) {
        yield put(getDataFailure(getErrorFromRequest(error)));
    }
}

export const sampleSagas: Effect[] = [
    takeEvery<
        GetAllDataAction,
        Saga<void>,
        'GET_ALL_DATA_REQUEST',
        typeof getAllDataRequest
    >('GET_ALL_DATA_REQUEST', getAllDataRequest),
    takeEvery<
        GetFilteredDataAction,
        Saga<void>,
        'GET_FILTERED_DATA_REQUEST',
        typeof getFilteredDataRequest
    >('GET_FILTERED_DATA_REQUEST', getFilteredDataRequest),
];

export function* sampleRootSaga(): Saga<void> {
    yield all([
        ...sampleSagas,
    ]);
}
