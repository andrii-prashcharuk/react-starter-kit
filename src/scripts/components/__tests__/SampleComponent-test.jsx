'use strict';
import React from 'react';
import renderer from 'react/lib/ReactTestRenderer';
import { Provider } from 'react-redux';
import { List } from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SampleComponent from '../SampleComponent';
import actionTypes from '../../constants/actionTypes';
import SampleInitialState from '../../reducers/sample/sampleInitialState';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const {
  GET_DATA_REQUEST
} = actionTypes;

const serverData = [
  {
    'id': '1',
    'label': 'First list item from server'
  },
  {
    'id': '2',
    'label': 'Second list item from server'
  }
];
const fetchingState = {
  data: new List([]),
  isFetching: true,
  error: null
};
const dataState = {
  data: new List(serverData),
  isFetching: false,
  error: null
};
const errorState = {
  data: new List([]),
  isFetching: false,
  error: 'Some Error'
};

jest.mock('react-dom');

describe('SampleComponent tests', () => {
  it('should be rendered correctly with empty data)', () => {
    const store = mockStore({ sampleReducer: new SampleInitialState() });
    const tree = renderer
      .create(
        <Provider store={store}>
          <SampleComponent/>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(store.getActions()).toEqual([{ 'type': GET_DATA_REQUEST }]);
  });
  
  it('should be rendered correctly while fetching', () => {
    const store = mockStore({ sampleReducer: new SampleInitialState(fetchingState) });
    const tree = renderer
      .create(
        <Provider store={store}>
          <SampleComponent/>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be rendered correctly with some dataset from server', () => {
    const store = mockStore({ sampleReducer: new SampleInitialState(dataState) });
    const tree = renderer
      .create(
        <Provider store={store}>
          <SampleComponent/>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be rendered correctly with some filtered dataset from server', () => {
    const store = mockStore({ sampleReducer: new SampleInitialState(dataState) });
    const filter = { foo: 'bar' };
    const tree = renderer
      .create(
        <Provider store={store}>
          <SampleComponent filter={filter}/>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should be rendered correctly with if error occurs', () => {
    window.alert = jest.fn();
    
    const store = mockStore({ sampleReducer: new SampleInitialState(errorState) });
    const tree = renderer
      .create(
        <Provider store={store}>
          <SampleComponent/>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(window.alert).toBeCalledWith(errorState.error);
  });
});
