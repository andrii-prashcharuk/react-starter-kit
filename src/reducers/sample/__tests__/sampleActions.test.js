import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as actions from '../sampleActions';
import actionTypes from '../../../constants/actionTypes';

const {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
} = actionTypes;
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
        server = sinon.fakeServer.create();
    });

    afterEach(() => {
        server.restore();
    });

    it('should return correct event type for getCarsRequest', () => {
        expect(actions.getDataRequest()).toEqual({
            type: GET_DATA_REQUEST,
        });
    });

    it('should return correct event type and data for getDataSuccess', () => {
        expect(actions.getDataSuccess(serverData)).toEqual({
            type: GET_DATA_SUCCESS,
            payload: serverData,
        });
    });

    it('should return correct event type and data for getDataFailure', () => {
        const error = {
            error: 'Some Error',
        };
        expect(actions.getDataFailure(error)).toEqual({
            type: GET_DATA_FAILURE,
            payload: error,
        });
    });

    it('should create correct actions after getAllData is called successfully', () => {
        const store = mockStore({ data: [] });
        const expectedActions = [
            { type: GET_DATA_REQUEST },
            { type: GET_DATA_SUCCESS, payload: serverData },
        ];

        server.respondWith('/__mocks__/data/sample_data.json', JSON.stringify(serverData));
        setTimeout(() => server.respond(), 0);

        return store.dispatch(actions.getAllData())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create correct actions after getAllData is called and failed', () => {
        const store = mockStore({ data: [] });
        const error = { error: 'Some error' };
        const expectedActions = [
            { type: GET_DATA_REQUEST },
            { type: GET_DATA_FAILURE, payload: error },
        ];

        server.respondWith('/__mocks__/data/sample_data.json', [404, {}, JSON.stringify(error)]);
        setTimeout(() => server.respond(), 0);

        return store.dispatch(actions.getAllData())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create correct actions after getFilteredData is called successfully', () => {
        const store = mockStore({ data: [] });
        const expectedActions = [
            { type: GET_DATA_REQUEST },
            { type: GET_DATA_SUCCESS, payload: serverData },
        ];

        server.respondWith('/__mocks__/data/sample_data.json', JSON.stringify(serverData));
        setTimeout(() => server.respond(), 0);

        return store.dispatch(actions.getFilteredData())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('should create correct actions after getFilteredData is called and failed', () => {
        const store = mockStore({ data: [] });
        const error = { error: 'Some error' };
        const expectedActions = [
            { type: GET_DATA_REQUEST },
            { type: GET_DATA_FAILURE, payload: error },
        ];

        server.respondWith('/__mocks__/data/sample_data.json', [404, {}, JSON.stringify(error)]);
        setTimeout(() => server.respond(), 0);

        return store.dispatch(actions.getFilteredData())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});
