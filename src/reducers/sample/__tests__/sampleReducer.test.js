import sample from '../sampleReducer';
import actionTypes from '../../../constants/actionTypes';

const {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
} = actionTypes;

describe('sample tests', () => {
    describe('check init values', () => {
        let initialState = null;

        beforeEach(() => {
            const action = {
                type: 'dummy',
            };
            initialState = sample(undefined, action);
        });

        it('sets data to an empty List', () => {
            expect(initialState.data.toJS()).toEqual([]);
        });

        it('sets isFetching to false', () => {
            expect(initialState.isFetching).toBeFalsy();
        });

        it('sets error to null', () => {
            expect(initialState.error).toBeNull();
        });
    });

    describe('GET_DATA_REQUEST', () => {
        it('sets isFetching to true and error to null', () => {
            const action = {
                type: GET_DATA_REQUEST,
            };
            const next = sample(undefined, action);

            expect(next.isFetching).toBeTruthy();
            expect(next.error).toBeNull();
        });
    });

    describe('GET_DATA_SUCCESS', () => {
        it('saves data to data list, sets isFetching to false and error to null', () => {
            const serverData = [{
                label: 'bar1',
            }, {
                label: 'bar2',
            }];
            const action = {
                type: GET_DATA_SUCCESS,
                payload: serverData,
            };
            const next = sample(undefined, action);

            expect(next.data.toJS()).toEqual(serverData);
            expect(next.isFetching).toBeFalsy();
            expect(next.error).toBeNull();
        });
    });

    describe('GET_DATA_FAILURE', () => {
        it('sets isFetching to false and saves error object to error', () => {
            const error = {
                error: 'Some Error',
            };
            const action = {
                type: GET_DATA_FAILURE,
                payload: error,
            };
            const next = sample(undefined, action);

            expect(next.isFetching).toBeFalsy();
            expect(next.error).toEqual(error);
        });
    });
});
