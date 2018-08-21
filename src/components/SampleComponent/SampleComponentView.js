// @flow
import React from 'react';
import {
    FETCHING_DATA_MSG,
    NO_DATA_MSG,
} from '../../constants';
import type { DataItem } from '../../constants';
import './SampleComponent.scss';

type Props = {
    getFilteredData: string => *,
    getAllData: () => *,
    data: DataItem[],
    isFetching: boolean,
    error: string | null,
    filter?: string,
};

export default class SampleComponent extends React.Component<Props> {
    componentDidMount() {
        const { filter } = this.props;

        if (filter) {
            this.props.getFilteredData(filter);
        } else {
            this.props.getAllData();
        }
    }
    props: Props;
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
            content = <div>{FETCHING_DATA_MSG}</div>;
        } else if (!data.length) {
            content = <div>{NO_DATA_MSG}</div>;
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
