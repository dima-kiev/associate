import {createReducer} from '../utils/index';

//noinspection JSUnresolvedVariable
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,

    DEL_USERS_REQUEST,
    DEL_USERS_SUCCESS,
    DEL_USERS_FAILURE,

    SAVE_USER_REQUEST,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE,

    SAVE_USER_ROLE_REQUEST,
    SAVE_USER_ROLE_SUCCESS,
    SAVE_USER_ROLE_FAILURE,

    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,

    GET_USER_ROLES_REQUEST,
    GET_USER_ROLES_SUCCESS,
    GET_USER_ROLES_FAILURE,

    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,

    DEL_USER_ROLES_REQUEST,
    DEL_USER_ROLES_SUCCESS,
    DEL_USER_ROLES_FAILURE,

    CLEAR_STATE,

    GET_ASSIGNED_SUCCESS,
    GET_ROLES_REQUEST,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAILURE,
    ASSIGN_COMPANY,
    SAVE_CREDENTIALS_USER_FAILURE,
    GET_USER_ROLES_TEMP
} from '../constants/user';

const initialState = {
    isGetting:     false,
    isGet:         false,
    page:          null,
    userList:      [],
    errorForm:     null,
    isSaving:      false,
    isSave:        false,
    tempUser:      null,
    tempUserRoles: null,
    actionSuccess: false,
    isDeleting:    false,
    roles:         null,
    errorList:     null,
    baseUserRoles: null
};

export default createReducer(initialState, {
    [GET_USERS_REQUEST]: (state) => {
        return Object.assign({}, state, {
            'isGetting': true
        });
    },

    [GET_USERS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isGetting':  false,
            'isGet': true,
            'userList':  payload.usersList,
            'page' : payload.page
        });
    },

    [GET_USERS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isGetting': false,
            'userList': null,
            'errorList': payload.error
        });
    },


    [GET_ASSIGNED_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isGetting':  false,
            'isGet': true,
            'assignedUserList':  payload.userList
        });
    },

    [SAVE_USER_REQUEST]: (state) => {
        return Object.assign({}, state, {
            'isSaving': true
        });
    },

    [SAVE_USER_SUCCESS]: (state) => {
        return Object.assign({}, state, {
            'isSave': true,
            'isSaving': false,
            'actionSuccess': true,
            'errorForm': null
        });
    },

    [SAVE_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'errorForm': payload.error
        });
    },

    [SAVE_USER_ROLE_REQUEST]: (state) => {
        return Object.assign({}, state, {
            'errorText': ''
        });
    },

    [SAVE_USER_ROLE_SUCCESS]: (state) => {
        return Object.assign({}, state, {

        });
    },

    [SAVE_USER_ROLE_FAILURE]: (state) => {
        return Object.assign({}, state, {
            'errorText': 'Error user role'
        });
    },

    [EDIT_USER_REQUEST]: (state) => {
        return Object.assign({}, state, {
            'tempUser': null,
            'tempUserRoles': null,
            'baseUserRoles': null,
            'actionSuccess': false,
            'errorList': null,
            'errorForm': null
        });
    },

    [EDIT_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'tempUser': payload.user
        });
    },

    [EDIT_USER_FAILURE]: (state) => {
        return Object.assign({}, state, {

        });
    },

    [GET_USER_ROLES_REQUEST]: (state) => {
        return Object.assign({}, state, {
            'tempUserRoles': null,
            'baseUserRoles': null
        });
    },

    [GET_USER_ROLES_SUCCESS]: (state, payload) => {
        //noinspection JSUnresolvedVariable
        return Object.assign({}, state, {
            'tempUserRoles': payload,
            'baseUserRoles': payload
        });
    },

    [GET_USER_ROLES_REQUEST]: (state) => {
        return Object.assign({}, state, {

        });
    },

    [UPDATE_USER_REQUEST]: (state) => {
        return Object.assign({}, state, {

        });
    },

    [UPDATE_USER_SUCCESS]: (state) => {
        return Object.assign({}, state, {
            'errorForm': null,
            'actionSuccess': true
        });
    },

    [UPDATE_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'errorForm': payload.error
        });
    },

    [DEL_USER_ROLES_REQUEST]: (state) => {
        return Object.assign({}, state, {
            'isDeleting': true
        });
    },

    [DEL_USER_ROLES_SUCCESS]: (state) => {
        return Object.assign({}, state, {
            'isDeleting': false
        });
    },

    [DEL_USER_ROLES_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'errorForm': payload.error
        });
    },

    [CLEAR_STATE]: (state) => {
        return Object.assign({}, state, {
            'actionSuccess': false,
            'tempUser':      null,
            'tempUserRoles' : null,
            'baseUserRoles': null
        });
    },

    [DEL_USERS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'errorList': payload.error
        });
    },

    [GET_ROLES_REQUEST]: (state) => {
        return Object.assign({}, state, {

        });
    },

    [GET_ROLES_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'roles':payload.roles
        });
    },

    [GET_ROLES_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'errorList': payload.error
        });
    },

    [ASSIGN_COMPANY]: (state) => {
        return Object.assign({}, state, {
        });
    },

    [SAVE_CREDENTIALS_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'errorForm': payload.error
        });
    },

    [GET_USER_ROLES_TEMP]: (state, payload) => {
        return Object.assign({}, state, {
            'tempUserRoles': payload
        });
    }
});