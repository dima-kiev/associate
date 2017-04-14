import {createReducer} from '../utils/index';
//noinspection JSUnresolvedVariable
import {
    GET_PERMISSIONS_REQUEST,
    GET_PERMISSIONS_SUCCESS,
    GET_PERMISSIONS_FAILURE,

    GET_PERMISSION_REQUEST,
    GET_PERMISSION_SUCCESS,
    GET_PERMISSION_FAILURE,

    DEL_PERMISSION_REQUEST,
    DEL_PERMISSION_SUCCESS,
    DEL_PERMISSION_FAILURE,

    SAVE_PERMISSION_REQUEST,
    SAVE_PERMISSION_SUCCESS,
    SAVE_PERMISSION_FAILURE,

    UPD_PERMISSION_REQUEST,
    UPD_PERMISSION_SUCCESS,
    UPD_PERMISSION_FAILURE,

    CLEAR_PERMISSION,
    ADD_PERMISSION,
    PERMISSION_FIELD_VALUE,
    CLEAR_PERMISSION_FIELD_VALUE
} from '../constants/permission'

const initialState = {
    isGetting:  false,
    permissionList:  null,
    page: null,
    error: null,
    permission: null,
    formError: null,
    actionSuccess: false,
    rol: [],
    permissionFieldValue: null
};

export default createReducer(initialState, {

    //find all customers

    [GET_PERMISSIONS_REQUEST]: (state) => {
        return Object.assign({}, state, {
            'isGetting': true
        });
    },

    [GET_PERMISSIONS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isGetting':  false,
            'permissionList':  payload.permissionList,
            'page' : payload.page,
            'error': null
        });
    },

    [GET_PERMISSIONS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isGetting': false,
            'permissionList': null,
            'error': payload.message
        });
    },

    //save customer

    [SAVE_PERMISSION_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'formError' : null,
            'permission'  : payload.permission
        });
    },

    [SAVE_PERMISSION_SUCCESS]: (state) => {
        return Object.assign({}, state, {
            'actionSuccess':true
        });
    },

    [SAVE_PERMISSION_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'formError' : payload.message
        });
    },

    //delete customer

    [DEL_PERMISSION_REQUEST]: (state) => {
        return Object.assign({}, state, {});
    },

    [DEL_PERMISSION_SUCCESS]: (state) => {
        return Object.assign({}, state, {
            'error': null
        });
    },

    [DEL_PERMISSION_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'error' : payload.message
        });
    },

    //update customer

    [UPD_PERMISSION_REQUEST]: (state) => {
        return Object.assign({}, state, {

        });
    },

    [UPD_PERMISSION_SUCCESS]: (state) => {
        return Object.assign({}, state, {
            'actionSuccess':true
        });
    },

    [UPD_PERMISSION_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'formError' : payload.error
        });
    },

    //get customer

    [GET_PERMISSION_REQUEST]: (state) => {
        return Object.assign({}, state, {
            'permission':null
        });
    },

    [GET_PERMISSION_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'error': null,
            'permission': payload.permission
        });
    },

    [GET_PERMISSION_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'error' : payload.message
        });
    },

    [CLEAR_PERMISSION]: (state) => {
        return Object.assign({}, state, {
            'permission':null,
            'formError' : null,
            'actionSuccess':false,
            'permissionFieldValue': null
        });
    },

    [ADD_PERMISSION]: (state, payload) => {
        return Object.assign({}, state, {
            'error'    : null,
            'permission' : payload.permission
        })
    },

    [PERMISSION_FIELD_VALUE]: (state, payload) => {
        return Object.assign({}, state, {
            'permissionFieldValue': payload.permissionFieldValue
        })
    },

    [CLEAR_PERMISSION_FIELD_VALUE]: (state) => {
        return Object.assign({}, state, {
            'permissionFieldValue': null
        });
    },
});
