import {createReducer} from '../utils/index';
import {INIT_BASE_URL} from '../constants/baseUrl';

const initialState = {
    baseUrl:  null
};

export default createReducer(initialState, {
    [INIT_BASE_URL]: (state, payload) => {
        return Object.assign({}, state, {
            'baseUrl': payload.baseUrl
        });
    }
});

