import { List } from 'immutable';
import InitialState from './SampleInitialState';
import actionTypes from '../../constants/actionTypes';

const {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
} = actionTypes;
const initialState = new InitialState();

export default function sample(state = initialState, action) {
    let dataList;

    switch (action.type) {
        case GET_DATA_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['error'], null);

        case GET_DATA_SUCCESS:
            dataList = new List(action.payload);

            return state.setIn(['data'], dataList)
                .setIn(['isFetching'], false)
                .setIn(['error'], null);

        case GET_DATA_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload);

        default:
            return state;
    }
}
