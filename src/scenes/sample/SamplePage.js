// @flow
import React from 'react';
import type { Node } from 'react';
import SampleComponentData from '../../components/SampleComponent';

const SamplePage = (): Node => (
    <section>
        <h4>On this page you can see a sample data from server</h4>
        <SampleComponentData />
    </section>
);

export default SamplePage;
