import axios from 'axios';

const URL = '/__mocks__/data/sample_data.json';

export default {
    getAllData: () => axios.get(URL),
    getFilteredData: filter => axios.get(URL, { params: { filter } }),
};
