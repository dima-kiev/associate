import {createConstants} from '../utils/index';

export default createConstants(
    'LOGIN_USER_REQUEST',
    'LOGIN_USER_FAILURE',
    'LOGIN_USER_SUCCESS',
    'LOGOUT_USER',
    'SET_REFRESH_TOKEN',
    'REFRESH_TOKEN_FAILURE',
    'INIT_STORE_AFTER_RELOAD',
    'INIT_REFRESH_AUTH_TOKEN_REQUEST'
);
