// @flow
import axios from 'axios';
import type { AxiosPromise } from 'axios';
import type { DataItem } from '../constants';

const URL = '/__mocks__/sample_data.json';

const getAllData =
    (): AxiosPromise<DataItem[]> => axios.get(URL);

const getFilteredData =
    (filter: string): AxiosPromise<DataItem[]> => axios.get(URL, { params: { filter } });

export default {
    getAllData,
    getFilteredData,
};
