import $ from 'jquery';

const URL = '/mocks/data/sample_data.json';

export default {
    getAllData() {
        return $.ajax({
            url: URL,
            dataType: 'json',
        });
    },
    getFilteredData(filter) {
        return $.ajax({
            url: URL,
            dataType: 'json',
            data: { filter },
        });
    },
};
