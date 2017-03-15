import {createReducer} from '../utils/index';
//noinspection JSUnresolvedVariable
import {
    GET_MENU_SUCCESS,
    GET_MENU_FAILURE
} from '../constants/menu';

const initialState = {
    menuList:  null,
    error   :  null
};

export default createReducer(initialState, {
    [GET_MENU_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'menuList': payload.list
        });
    },

    [GET_MENU_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'error': payload.error
        });
    },
});
