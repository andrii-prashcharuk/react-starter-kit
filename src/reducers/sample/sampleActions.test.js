// @flow
import SagaTester from 'redux-saga-tester';
import axios from 'axios';
import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import * as actions from './sampleActions';
import { getPromiseData, getPromiseError } from '../../utils/test-utils';

const serverData = [
    {
        id: '1',
        label: 'First list item from server',
    },
    {
        id: '2',
        label: 'Second list item from server',
    },
];

describe('sampleActions tests', () => {
    describe('testing simple actions', () => {
        it('should return correct event type for getDataRequest', () => {
            expect(actions.getDataRequest()).to.deep.equal({
                type: 'GET_DATA_REQUEST',
            });
        });

        it('should return correct event type and data for getDataSuccess', () => {
            expect(actions.getDataSuccess(serverData)).to.deep.equal({
                type: 'GET_DATA_SUCCESS',
                payload: serverData,
            });
        });

        it('should return correct event type and data for getDataFailure', () => {
            const error = 'Some Error';
            expect(actions.getDataFailure(error)).to.deep.equal({
                type: 'GET_DATA_FAILURE',
                payload: error,
            });
        });
    });

    describe('testing saga actions', () => {
        let sandbox;
        let sagaTester;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
            sagaTester = new SagaTester();
            sagaTester.run(actions.sampleRootSaga);
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should create correct actions after getAllData is called successfully', async () => {
            const expectedActions = [
                { type: 'GET_ALL_DATA_REQUEST' },
                { type: 'GET_DATA_REQUEST' },
                { type: 'GET_DATA_SUCCESS', payload: serverData },
            ];

            sandbox.stub(axios, 'get')
                .withArgs('/static/sample_data.json')
                .returns(getPromiseData(serverData));

            sagaTester.dispatch(actions.getAllData());
            await sagaTester.waitFor('GET_DATA_SUCCESS');

            expect(sagaTester.getCalledActions()).to.deep.equal(expectedActions);
        });

        it('should create correct actions after getAllData is called and failed', async () => {
            const error = { error: 'Some error' };
            const expectedActions = [
                { type: 'GET_ALL_DATA_REQUEST' },
                { type: 'GET_DATA_REQUEST' },
                { type: 'GET_DATA_FAILURE', payload: error.error },
            ];

            sandbox.stub(axios, 'get')
                .withArgs('/static/sample_data.json')
                .returns(getPromiseError(error));

            sagaTester.dispatch(actions.getAllData());
            await sagaTester.waitFor('GET_DATA_FAILURE');

            expect(sagaTester.getCalledActions()).to.deep.equal(expectedActions);
        });

        it('should create correct actions after getFilteredData is called successfully', async () => {
            const filter = 'someFilterValue';
            const expectedActions = [
                { type: 'GET_FILTERED_DATA_REQUEST', payload: filter },
                { type: 'GET_DATA_REQUEST' },
                { type: 'GET_DATA_SUCCESS', payload: serverData },
            ];

            sandbox.stub(axios, 'get')
                .withArgs('/static/sample_data.json', { params: { filter } })
                .returns(getPromiseData(serverData));

            sagaTester.dispatch(actions.getFilteredData(filter));
            await sagaTester.waitFor('GET_DATA_SUCCESS');

            expect(sagaTester.getCalledActions()).to.deep.equal(expectedActions);
        });

        it('should create correct actions after getFilteredData is called and failed', async () => {
            const filter = 'someFilterValue';
            const error = { error: 'Some error' };
            const expectedActions = [
                { type: 'GET_FILTERED_DATA_REQUEST', payload: filter },
                { type: 'GET_DATA_REQUEST' },
                { type: 'GET_DATA_FAILURE', payload: error.error },
            ];

            sandbox.stub(axios, 'get')
                .withArgs('/static/sample_data.json', { params: { filter } })
                .returns(getPromiseError(error));

            sagaTester.dispatch(actions.getFilteredData(filter));
            await sagaTester.waitFor('GET_DATA_FAILURE');

            expect(sagaTester.getCalledActions()).to.deep.equal(expectedActions);
        });
    });
});
