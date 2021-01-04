// @flow
import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import type { DataItem } from '../../constants';
import SampleComponent from './SampleComponentView';

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

export type RenderComponentProps = {
    getFilteredData?: string => *,
    getAllData?: () => *,
    data?: DataItem[],
    isFetching?: boolean,
    error?: string | null,
    filter?: string,
};

const renderComponent = ({
    getFilteredData = () => {},
    getAllData = () => {},
    data = [],
    isFetching = false,
    error = null,
    filter,
}: RenderComponentProps) => render(
    <SampleComponent
        getFilteredData={getFilteredData}
        getAllData={getAllData}
        data={data}
        isFetching={isFetching}
        error={error}
        filter={filter}
    />,
);

describe('<SampleComponent />', () => {
    afterEach(cleanup);

    test('should be rendered correctly with empty data', () => {
        const getAllData = jest.fn();
        renderComponent({ getAllData });

        expect(screen.getByText('No data were found')).toBeInTheDocument();
        expect(getAllData).toHaveBeenCalledWith();
    });

    test('should be rendered correctly while fetching', () => {
        renderComponent({ isFetching: true });

        expect(screen.getByText('Data are loading...')).toBeInTheDocument();
    });

    test('should be rendered correctly with some dataset from server', () => {
        const { container } = renderComponent({ data: serverData });

        expect(screen.getByText('List:')).toBeInTheDocument();
        expect(container.querySelectorAll('li').length).toEqual(2);
    });

    test('should be rendered correctly with some filtered dataset from server', () => {
        const { container } = renderComponent({ data: serverData, filter: 'foo=bar' });

        expect(screen.getByText('List (filtered):')).toBeInTheDocument();
        expect(container.querySelectorAll('li').length).toEqual(2);
    });

    test('should be rendered correctly with if error occurs', () => {
        renderComponent({ error: 'Some Error' });

        expect(screen.getByText('Some Error')).toBeInTheDocument();
    });
});
