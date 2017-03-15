//noinspection JSUnresolvedVariable
import {INIT_BASE_URL} from '../constants/baseUrl';

export function initBaseUrl(path) {
    return {
        type: INIT_BASE_URL,
        payload: {
            baseUrl: path
        }
    }
}
