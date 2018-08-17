// @flow
import { expect } from 'chai';
import sample from './sampleReducer';
import initialState from './sampleInitialState';

describe('sample tests', () => {
    describe('check init values', () => {
        it('sets data to an empty List', () => {
            expect(initialState.data).to.deep.equal([]);
        });

        it('sets isFetching to false', () => {
            expect(initialState.isFetching).to.equal(false);
        });

        it('sets error to null', () => {
            expect(initialState.error).to.equal(null);
        });
    });

    describe('GET_DATA_REQUEST', () => {
        it('sets isFetching to true and error to null', () => {
            const action = {
                type: 'GET_DATA_REQUEST',
            };
            const next = sample(undefined, action);

            expect(next.isFetching).to.equal(true);
            expect(next.error).to.equal(null);
        });
    });

    describe('GET_DATA_SUCCESS', () => {
        it('saves data to data list, sets isFetching to false and error to null', () => {
            const serverData = [{
                id: '1',
                label: 'bar1',
            }, {
                id: '2',
                label: 'bar2',
            }];
            const action = {
                type: 'GET_DATA_SUCCESS',
                payload: serverData,
            };
            const next = sample(undefined, action);

            expect(next.data).to.deep.equal(serverData);
            expect(next.isFetching).to.equal(false);
            expect(next.error).to.equal(null);
        });
    });

    describe('GET_DATA_FAILURE', () => {
        it('sets isFetching to false and saves error object to error', () => {
            const error = 'Some Error';
            const action = {
                type: 'GET_DATA_FAILURE',
                payload: error,
            };
            const next = sample(undefined, action);

            expect(next.isFetching).to.equal(false);
            expect(next.error).to.deep.equal(error);
        });
    });
});
