// @flow
import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { testRender, makeTestStore } from '../../utils/testUtils';
import SampleComponent from './SampleComponent';

const serverData = [
    {
        id: '1',
        label: 'First list item from server',
    },
    {
        id: '2',
        label: 'Second list item from server',
    },
];

describe('<SampleComponent />', () => {
    afterEach(cleanup);

    test('should be rendered correctly with initial state', () => {
        const store = makeTestStore();

        testRender(<SampleComponent />, store);

        expect(screen.getByText('Data are loading...')).toBeInTheDocument();
        expect(store.dispatch).toHaveBeenCalledWith({ type: 'GET_ALL_DATA_REQUEST' });
    });

    test('should be rendered correctly with empty data', () => {
        const store = makeTestStore({
            sample: {
                isFetching: false,
                data: [],
                error: null,
            },
        });

        testRender(<SampleComponent />, store);

        expect(screen.getByText('No data were found')).toBeInTheDocument();
    });

    test('should be rendered correctly while fetching', () => {
        const store = makeTestStore({
            sample: {
                isFetching: true,
                data: [],
                error: null,
            },
        });

        testRender(<SampleComponent />, store);

        expect(screen.getByText('Data are loading...')).toBeInTheDocument();
    });

    test('should be rendered correctly with some dataset from server', () => {
        const store = makeTestStore({
            sample: {
                isFetching: false,
                data: serverData,
                error: null,
            },
        });

        const { container } = testRender(<SampleComponent />, store);

        expect(screen.getByText('List:')).toBeInTheDocument();
        expect(container.querySelectorAll('li').length).toEqual(2);
    });

    test('should be rendered correctly with some filtered dataset from server', () => {
        const store = makeTestStore({
            sample: {
                isFetching: false,
                data: serverData,
                error: null,
            },
        });
        const { container } = testRender(<SampleComponent filter="foo=bar" />, store);

        expect(screen.getByText('List (filtered):')).toBeInTheDocument();
        expect(container.querySelectorAll('li').length).toEqual(2);
    });

    test('should be rendered correctly with if error occurs', () => {
        const store = makeTestStore({
            sample: {
                isFetching: false,
                data: [],
                error: 'Some Error',
            },
        });
        const { getByText } = testRender(<SampleComponent filter="foo=bar" />, store);

        expect(getByText('Some Error')).toBeInTheDocument();
    });
});
