// @flow
import type { ComponentType } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFilteredData, getAllData } from '../../reducers/sample/sampleActions';
import type { DataItem, State } from '../../constants';
import SampleComponentView from './SampleComponentView';
import type { Props } from './SampleComponentView';

type OwnProps = {|
    filter?: string,
|};

type MapStateToProps = (State, OwnProps) => {|
    data: DataItem[],
    isFetching: boolean,
    error: string | null,
|};

const mapStateToProps: MapStateToProps = (state: State) => {
    const { data, isFetching, error } = state.sample;

    return {
        data,
        isFetching,
        error,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getFilteredData: bindActionCreators(getFilteredData, dispatch),
    getAllData: bindActionCreators(getAllData, dispatch),
});

const WrappedComponent: ComponentType<OwnProps> = connect<
    Props, OwnProps, _, _, _, _,
>(mapStateToProps, mapDispatchToProps)(SampleComponentView);

export default WrappedComponent;
