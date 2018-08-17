// @flow
import type { DataItem } from '../../constants';

export type SampleState = {
    data: DataItem[],
    isFetching: boolean,
    error: string | null,
};

const initialState = {
    data: [],
    isFetching: false,
    error: null,
};

export default initialState;
