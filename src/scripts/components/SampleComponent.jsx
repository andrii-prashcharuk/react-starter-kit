'use strict';
import React from 'react';
import {bindAll, includes} from 'lodash';
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
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isFetching: false,
      error: null
    };
  }
  componentDidMount() {
    const { filter } = this.props;

    if (filter) {
      this.props.actions.getFilteredData(filter);
    } else {
      this.props.actions.getAllData();
    }
  }
  componentWillReceiveProps(props) {
    this.setState(props.sampleData);
  }
  render() {
    let {data, isFetching, error} = this.state;
    let buildItems;
    let content;

    if (!data.length) {
      content = <div>{config.NO_DATA_MSG}</div>;
    } else if (isFetching) {
      content = <div>{config.FETCHING_DATA_MSD}</div>;
    } else {
      buildItems = data.map((dataItem) => {
        return <li>{dataItem.label}</li>
      });
      content = <ul>{buildItems}</ul>;
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