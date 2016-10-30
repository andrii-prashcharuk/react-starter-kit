/**
 * This class combines all the reducers into one
 */
import { combineReducers } from 'redux';
import sample from './sample/sampleReducer';

export default combineReducers({
    sample,
});
