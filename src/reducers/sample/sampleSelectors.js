// @flow
import type { State, DataItem } from '../../types';

export const getSampleData = (state: State): DataItem[] => state.sample.data;
export const isSampleFetching = (state: State): boolean => state.sample.isFetching;
export const getSampleError = (state: State): string | null => state.sample.error;
