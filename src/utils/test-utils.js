// @flow
// import type { AxiosPromise } from 'axios';
// import { AxiosXHR } from 'axios';

export const getPromiseData = (data: any): Promise<
    AxiosSagaResult<any>
> => Promise.resolve({ data });

export const getPromiseError = (error: any): Promise<
    AxiosSagaResult<any>
> => (
    Promise.reject({ response: { data: error } })
);
