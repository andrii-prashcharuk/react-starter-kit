import { Record, List } from 'immutable';

const InitialState = new Record({
    data: new List([]),
    isFetching: false,
    error: null,
});

export default InitialState;
