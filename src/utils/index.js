export function getErrorFromRequest(request) {
    return request.response.data || { error: 'Unknown Error' };
}
