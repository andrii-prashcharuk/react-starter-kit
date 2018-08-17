// @flow
import type { $AxiosError } from 'axios';

export function getErrorFromRequest(request: $AxiosError<string>): string {
    return (request.response && request.response.data) || 'Unknown Error';
}
