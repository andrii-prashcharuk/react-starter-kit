// @flow
import initialState from './sampleInitialState';
import type { SampleState } from './sampleInitialState';
import type { SampleAction } from './sampleActions';

export default function sample(
    state?: SampleState = initialState, action: SampleAction,
): SampleState {
    switch (action.type) {
        case 'GET_DATA_REQUEST':
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        case 'GET_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload,
                isFetching: false,
                error: null,
            };
        case 'GET_DATA_FAILURE':
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
