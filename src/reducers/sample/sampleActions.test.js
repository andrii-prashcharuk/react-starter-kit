// @flow
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';
import { fakeServer } from 'sinon';
import * as actions from './sampleActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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
    let server;

    beforeEach(() => {
        server = fakeServer.create({ autoRespond: true });
    });

    afterEach(() => {
        server.restore();
    });

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

    it('should create correct actions after getAllData is called successfully', async () => {
        const store = mockStore({ data: [] });
        const expectedActions = [
            { type: 'GET_DATA_REQUEST' },
            { type: 'GET_DATA_SUCCESS', payload: serverData },
        ];

        server.respondWith('/__mocks__/sample_data.json', JSON.stringify(serverData));
        await store.dispatch(actions.getAllData());

        expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should create correct actions after getAllData is called and failed', async () => {
        const store = mockStore({ data: [] });
        const error = { error: 'Some error' };
        const expectedActions = [
            { type: 'GET_DATA_REQUEST' },
            { type: 'GET_DATA_FAILURE', payload: error.error },
        ];

        server.respondWith('/__mocks__/sample_data.json', [404, {}, JSON.stringify(error)]);
        await store.dispatch(actions.getAllData());

        expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should create correct actions after getFilteredData is called successfully', async () => {
        const store = mockStore({ data: [] });
        const expectedActions = [
            { type: 'GET_DATA_REQUEST' },
            { type: 'GET_DATA_SUCCESS', payload: serverData },
        ];

        server.respondWith('/__mocks__/sample_data.json?filter=filter', JSON.stringify(serverData));
        await store.dispatch(actions.getFilteredData('filter'));

        expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should create correct actions after getFilteredData is called and failed', async () => {
        const store = mockStore({ data: [] });
        const error = { error: 'Some error' };
        const expectedActions = [
            { type: 'GET_DATA_REQUEST' },
            { type: 'GET_DATA_FAILURE', payload: error.error },
        ];

        server.respondWith('/__mocks__/sample_data.json?filter=filter', [404, {}, JSON.stringify(error)]);
        await store.dispatch(actions.getFilteredData('filter'));

        expect(store.getActions()).to.deep.equal(expectedActions);
    });
});
