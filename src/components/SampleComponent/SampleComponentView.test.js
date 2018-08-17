// @flow
import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
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

const defaultProps = {
    getFilteredData: () => {},
    getAllData: () => {},
    data: [],
    isFetching: false,
    error: null,
};

describe('SampleComponent tests', () => {
    it('should be rendered correctly with empty data', () => {
        const getAllData = spy();
        const wrapper = mount(
            <SampleComponent
                {...defaultProps}
                getAllData={getAllData}
            />,
        );
        expect(wrapper.find('.SampleComponent > div').text()).equal('No data were found');
        expect(getAllData).to.have.been.calledWithExactly();
    });

    it('should be rendered correctly while fetching', () => {
        const wrapper = shallow(
            <SampleComponent
                {...defaultProps}
                isFetching
            />,
        );
        expect(wrapper.find('.SampleComponent > div').text()).equal('Data are loading...');
    });

    it('should be rendered correctly with some dataset from server', () => {
        const wrapper = shallow(
            <SampleComponent
                {...defaultProps}
                data={serverData}
            />,
        );
        expect(wrapper.find('h3').text()).equal('List:');
        expect(wrapper.find('li')).to.have.length(2);
    });

    it('should be rendered correctly with some filtered dataset from server', () => {
        const wrapper = shallow(
            <SampleComponent
                {...defaultProps}
                data={serverData}
                filter="foo=bar"
            />,
        );
        expect(wrapper.find('h3').text()).equal('List (filtered):');
        expect(wrapper.find('li')).to.have.length(2);
    });

    it('should be rendered correctly with if error occurs', () => {
        const wrapper = shallow(
            <SampleComponent
                {...defaultProps}
                error="Some Error"
            />,
        );
        expect(wrapper.find('span').text()).equal('Some Error');
    });
});
