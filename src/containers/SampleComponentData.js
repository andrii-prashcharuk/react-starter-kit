import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFilteredData, getAllData } from '../reducers/sample/sampleActions';
import SampleComponent from '../components/SampleComponent';

function mapStateToProps(state) {
    const { data, isFetching, error } = state.sample.toJS();

    return {
        data,
        isFetching,
        error,
    };
}

const mapDispatchToProps = dispatch => ({
    getFilteredData: bindActionCreators(getFilteredData, dispatch),
    getAllData: bindActionCreators(getAllData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SampleComponent);
