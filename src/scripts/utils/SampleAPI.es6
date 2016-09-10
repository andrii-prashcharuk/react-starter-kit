'use strict';
import $ from 'jquery';
import config from '../constants/config';

export default {
  getAllData() {
    return $.ajax({
      url: config.URL,
      dataType: 'json'
    });
  },
  getFilteredData(filter) {
    return $.ajax({
      url: config.URL,
      dataType: 'json',
      data: { filter }
    });
  }
}