// @flow
import React from 'react';
import type { Node } from 'react';
import {
    FETCHING_DATA_MSG,
    NO_DATA_MSG,
} from '../../constants';
import type { DataItem } from '../../constants';
import bgImage from './images/bg-image.png';

export type Props = {
    getFilteredData: string => *,
    getAllData: () => *,
    data: DataItem[],
    isFetching: boolean,
    error: string | null,
    filter?: string,
};

export default class SampleComponent extends React.Component<Props> {
    componentDidMount() {
        const { filter, getFilteredData, getAllData } = this.props;

        if (filter) {
            getFilteredData(filter);
        } else {
            getAllData();
        }
    }

    renderError(): Node {
        const { error } = this.props;

        if (error) {
            return <span>{error}</span>;
        }
        return null;
    }

    render(): Node {
        const { data, isFetching, filter } = this.props;
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
                    <h3>
                        List
                        {filter ? ' (filtered)' : ''}
                        :
                    </h3>
                    <ul>{dataItems}</ul>
                </div>
            );
        }

        return (
            <div
                className="SampleComponent"
                css={{
                    background: `url(${bgImage}) no-repeat center`,
                    backgroundSize: 'cover',
                }}
            >
                {this.renderError()}
                {content}
            </div>
        );
    }
}
