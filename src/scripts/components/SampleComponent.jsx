'use strict';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from '../constants/config';
import * as sampleActions from '../reducers/sample/sampleActions';

/**
 *  Instead of including all app states via ...state
 */
function mapStateToProps(state) {
  return {
    sampleData: state.sampleReducer.toJS()
  };
}

/**
 * Bind all the actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sampleActions, dispatch)
  };
}

class SampleComponent extends React.Component {
  componentDidMount() {
    const { filter } = this.props;

    if (filter) {
      this.props.actions.getFilteredData(filter);
    } else {
      this.props.actions.getAllData();
    }
  }
  render() {
    let {data, isFetching, error} = this.props.sampleData;
    let dataItems;
    let content;

    if (isFetching) {
      content = <div>{config.FETCHING_DATA_MSD}</div>;
    } else if (!data.length) {
      content = <div>{config.NO_DATA_MSG}</div>;
    } else {
      dataItems = data.map(({id, label}) => <li key={id}>{label}</li>);
      content = (
        <div>
          <h3>List{this.props.filter ? ' (filtered)' : ''}:</h3>
          <ul>{dataItems}</ul>
        </div>
      );
    }

    if (error) {
      alert(error);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(SampleComponent);
