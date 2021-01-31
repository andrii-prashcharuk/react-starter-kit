// @flow
import React from 'react';
import type { Node } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptionsWithoutCustomQueries } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { AppStore, Return, State } from '../types';
import getStore from './getStore';

export const testRender = (
    ui: Node, store: AppStore, options?: RenderOptionsWithoutCustomQueries,
): Return<typeof render> => render(
    <Provider store={store}>{ui}</Provider>,
    options,
);

export const makeTestStore = (initialState?: State = {}): AppStore => {
    const store = getStore(initialState);
    const origDispatch = store.dispatch;

    store.dispatch = jest.fn(origDispatch);

    return store;
};

export const getPromiseData = (data: any): Promise<
    AxiosSagaResult<any>
> => Promise.resolve({ data });

export const getPromiseError = (error: any): Promise<
    AxiosSagaResult<any>
> => (
    Promise.reject({ response: { data: error } })
);
