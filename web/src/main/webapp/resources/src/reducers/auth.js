import {createReducer} from '../utils/index';
//noinspection JSUnresolvedVariable
import {

    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    SET_REFRESH_TOKEN,
    REFRESH_TOKEN_FAILURE,
    INIT_STORE_AFTER_RELOAD,
    INIT_REFRESH_AUTH_TOKEN_REQUEST

} from '../constants/auth';
import jwtDecode from 'jwt-decode';

const initialState = {
    token           : null,
    refreshToken    : null,
    userName        : null,
    isAuthenticated : false,
    isAuthenticating: false,
    statusText      : null,
    tokenTime       : null,
    roles           : null,
    status          : null,
    initToken       : null
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state) => {
        return Object.assign({}, state, {
            'isAuthenticating'  : true,
            'statusText'        : null
        });
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating'  : false,
            'token'             : payload.token,
            'refreshToken'      : payload.refreshToken,
            'statusText'        : 'You have been successfully logged in.',
            'userName'          : jwtDecode(payload.token),
            'tokenTime'         : jwtDecode(payload.token).exp,
            'roles'             : jwtDecode(payload.token).scopes
        });
    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating'  : false,
            'isAuthenticated'   : false,
            'token'             : null,
            'statusText'        : payload.message
        });
    },
    [LOGOUT_USER]: (state) => {
        return Object.assign({}, state, {
            'isAuthenticated'   : false,
            'token'             : null,
            'roles'             : null,
            'status'            : null,
            'initToken'         : null,
            'refreshToken'      : null,
            'userName'          : null,
            'tokenTime'         : null,
            'statusText'        : null
        });
    },
    [SET_REFRESH_TOKEN]: (state, payload) => {
        return Object.assign({}, state, {
            'token'     : payload.token,
            'tokenTime' : jwtDecode(payload.token).exp
        })
    },

    [REFRESH_TOKEN_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
          'status': payload.status
        })
    },

    [INIT_STORE_AFTER_RELOAD]: (state, payload) => {
        return Object.assign({}, state, {
            'userName'          : jwtDecode(payload.token),
            'tokenTime'         : jwtDecode(payload.token).exp,
            'roles'             : jwtDecode(payload.token).scopes,
            'token'             : payload.token,
            'refreshToken'      : payload.refreshToken,
            'isAuthenticated'   : true,
            'initToken'         : payload.token
        })
    },

    [INIT_REFRESH_AUTH_TOKEN_REQUEST]: (state) => {
        return Object.assign({}, state, {

        });
    }
});