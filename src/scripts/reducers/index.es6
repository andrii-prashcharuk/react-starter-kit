3/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
/**
 * ## Imports
 *
 * reducers
 */
import { combineReducers } from 'redux';
import sampleReducer from './sample/sampleReducer';

/**
 * ## CombineReducers
 */
const rootReducer = combineReducers({
  sampleReducer
});

export default rootReducer;
