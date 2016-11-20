import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../constants/config';
import * as sampleActions from '../reducers/sample/sampleActions';
import './SampleComponent.scss';

function mapStateToProps(state) {
    const { data, isFetching, error } = state.sample.toJS();

    return {
        data,
        isFetching,
        error,
    };
}

function mapDispatchToProps(dispatch) {
    const { getFilteredData, getAllData } = bindActionCreators(sampleActions, dispatch);

    return {
        getFilteredData,
        getAllData,
    };
}

class SampleComponent extends React.Component {
    static propTypes = {
        getFilteredData: React.PropTypes.func.isRequired,
        getAllData: React.PropTypes.func.isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired,
        })).isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.string,
        filter: React.PropTypes.string,
    };
    componentDidMount() {
        const { filter } = this.props;

        if (filter) {
            this.props.getFilteredData(filter);
        } else {
            this.props.getAllData();
        }
    }
    renderError() {
        const { error } = this.props;

        if (error) {
            return <span>{error}</span>;
        }
        return null;
    }
    render() {
        const { data, isFetching } = this.props;
        let dataItems;
        let content;

        if (isFetching) {
            content = <div>{config.FETCHING_DATA_MSD}</div>;
        } else if (!data.length) {
            content = <div>{config.NO_DATA_MSG}</div>;
        } else {
            dataItems = data.map(({ id, label }) => <li key={id}>{label}</li>);
            content = (
                <div>
                    <h3>List{this.props.filter ? ' (filtered)' : ''}:</h3>
                    <ul>{dataItems}</ul>
                </div>
            );
        }

        return (
            <div className="SampleComponent">
                {this.renderError()}
                {content}
            </div>
        );
    }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(SampleComponent);
