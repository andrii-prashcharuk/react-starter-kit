// @flow
import type { $AxiosError } from 'axios';

export function getErrorFromRequest(request: $AxiosError<{ error: string }>): string {
    return (request.response && request.response.data && request.response.data.error) || 'Unknown Error';
}
