// @flow
import React, { useEffect } from 'react';
import type { Node } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getSampleData,
    isSampleFetching,
    getSampleError,
} from '../../reducers/sample/sampleSelectors';
import { getFilteredData, getAllData } from '../../reducers/sample/sampleActions';
import {
    FETCHING_DATA_MSG,
    NO_DATA_MSG,
} from '../../constants';
import bgImage from './images/bg-image.png';

export type Props = {
    filter?: string,
};

const SampleComponent = ({ filter }: Props): Node => {
    const data = useSelector(getSampleData);
    const isFetching = useSelector(isSampleFetching);
    const error = useSelector(getSampleError);
    const dispatch = useDispatch();
    let dataItems;
    let content;

    useEffect(() => {
        if (data) {
            return;
        }
        if (filter) {
            dispatch(getFilteredData(filter));
        } else {
            dispatch(getAllData());
        }
    }, [dispatch, filter, data]);

    if (isFetching) {
        content = <div>{FETCHING_DATA_MSG}</div>;
    } else if (!data || !data.length) {
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
            {!!error && <span>{error}</span>}
            {content}
        </div>
    );
};

export default SampleComponent;
