import { List } from 'immutable';
import InitialState from './sampleInitialState';
import actionTypes from '../../constants/actionTypes';

const {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
} = actionTypes;
const initialState = new InitialState();

/**
 * ## sampleReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function sampleReducer(state = initialState, action) {
  let dataList;

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_DATA_REQUEST:
      return state.setIn(['isFetching'], true)
                  .setIn(['error'], null);

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set a received data to the state
     *
     */
    case GET_DATA_SUCCESS:
      dataList = new List(action.payload);

      return state.setIn(['data'], dataList)
                  .setIn(['isFetching'], false)
                  .setIn(['error'], null);

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_DATA_FAILURE:
      return state.setIn(['isFetching'], false)
                  .setIn(['error'], action.payload);

    default:
      return state;

  }
}
