// @flow
import type { DataItem } from '../../types';

export type SampleState = {
    data: DataItem[] | null,
    isFetching: boolean,
    error: string | null,
};

const initialState: SampleState = {
    data: null,
    isFetching: false,
    error: null,
};

export default initialState;
