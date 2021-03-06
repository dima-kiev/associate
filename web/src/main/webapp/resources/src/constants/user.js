import {createConstants} from '../utils/index';

export default createConstants(
    'GET_USERS_REQUEST',
    'GET_USERS_SUCCESS',
    'GET_USERS_FAILURE',

    'DEL_USERS_REQUEST',
    'DEL_USERS_SUCCESS',
    'DEL_USERS_FAILURE',

    'SAVE_USER_REQUEST',
    'SAVE_USER_SUCCESS',
    'SAVE_USER_FAILURE',

    'SAVE_USER_ROLE_REQUEST',
    'SAVE_USER_ROLE_SUCCESS',
    'SAVE_USER_ROLE_FAILURE',

    'EDIT_USER_REQUEST',
    'EDIT_USER_SUCCESS',
    'EDIT_USER_FAILURE',

    'GET_USER_ROLES_REQUEST',
    'GET_USER_ROLES_SUCCESS',
    'GET_USER_ROLES_FAILURE',

    'UPDATE_USER_REQUEST',
    'UPDATE_USER_SUCCESS',
    'UPDATE_USER_FAILURE',

    'DEL_USER_ROLES_REQUEST',
    'DEL_USER_ROLES_SUCCESS',
    'DEL_USER_ROLES_FAILURE',

    'GET_ASSIGNED_SUCCESS',
    'CLEAR_STATE',
    'GET_ROLES_REQUEST',
    'GET_ROLES_SUCCESS',
    'GET_ROLES_FAILURE',
    'ASSIGN_COMPANY',
    'SAVE_CREDENTIALS_USER_FAILURE',
    'GET_USER_ROLES_TEMP'
);
