// @flow
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
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
}: RenderComponentProps) => (
    <SampleComponent
        getFilteredData={getFilteredData}
        getAllData={getAllData}
        data={data}
        isFetching={isFetching}
        error={error}
        filter={filter}
    />
);

describe('SampleComponent tests', () => {
    it('should be rendered correctly with empty data', () => {
        const getAllData = spy();
        const wrapper = shallow(
            renderComponent({ getAllData }),
        );
        expect(wrapper.find('.SampleComponent > div').text()).equal('No data were found');
        expect(getAllData).to.have.been.calledWithExactly();
    });

    it('should be rendered correctly while fetching', () => {
        const wrapper = shallow(
            renderComponent({ isFetching: true }),
        );
        expect(wrapper.find('.SampleComponent > div').text()).equal('Data are loading...');
    });

    it('should be rendered correctly with some dataset from server', () => {
        const wrapper = shallow(
            renderComponent({ data: serverData }),
        );
        expect(wrapper.find('h3').text()).equal('List:');
        expect(wrapper.find('li')).to.have.length(2);
    });

    it('should be rendered correctly with some filtered dataset from server', () => {
        const wrapper = shallow(
            renderComponent({ data: serverData, filter: 'foo=bar' }),
        );
        expect(wrapper.find('h3').text()).equal('List (filtered):');
        expect(wrapper.find('li')).to.have.length(2);
    });

    it('should be rendered correctly with if error occurs', () => {
        const wrapper = shallow(
            renderComponent({ error: 'Some Error' }),
        );
        expect(wrapper.find('span').text()).equal('Some Error');
    });
});
