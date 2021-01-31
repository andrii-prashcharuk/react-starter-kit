// @flow
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import type { CombinedReducer, Reducer } from 'redux';
import type { Action } from '../types';
import sample from './sample/sampleReducer';
import { sampleSagas } from './sample/sampleActions';

export function* sagas(): Saga<void> {
    yield all([
        ...sampleSagas,
    ]);
}

type CombinedReducerState = {
    sample: typeof sample,
};

const combinedReducer: CombinedReducer<
    $ObjMap<CombinedReducerState, <CombinedReducerState>(
        r: Reducer<CombinedReducerState, any>
    ) => CombinedReducerState>, Action
> = combineReducers<CombinedReducerState, Action>({
    sample,
});

export default combinedReducer;
