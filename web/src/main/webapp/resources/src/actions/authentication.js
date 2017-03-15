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
import $ from 'jquery';
import { browserHistory, hashHistory } from 'react-router';
import { push, replace } from 'redux-router';

export function loginUserSuccess(token, refreshToken) {
    sessionStorage.setItem('refreshToken', refreshToken);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token,
            refreshToken: refreshToken
        }
    }
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            message:error
        }
    }
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function loginUser(username, password, baseUrl) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return $.ajax({
            type:       'POST',
            url:         baseUrl + '/api/auth/login',
            dataType:   'json',
            data:        JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => {
                    dispatch(loginUserSuccess(response.token, response.refreshToken));
                    hashHistory.replace('/');
            })
            .catch(error => {
                dispatch(loginUserFailure(error.responseJSON.message))
            })
    }
}

export function refreshAuthToken(baseUrl, token) {
    return function (dispatch) {
        dispatch(initRefreshAuthTokenRequest());
        return $.ajax({
            type:       'GET',
            url:         baseUrl + '/api/auth/token',
            dataType:   'json',
            headers: {
                'X-Authorization': `Bearer ${token}`
            }
        }).then(response => {
            dispatch(setRefreshToken(response.token));
        }).catch(error => {
            sessionStorage.removeItem('refreshToken');
            location.reload();
        })
}}

export function setRefreshToken(token) {
    return {
        type: SET_REFRESH_TOKEN,
        payload: {
            token: token
        }
    }
}

export function refreshTokenFailure(payload) {
    return {
        type: REFRESH_TOKEN_FAILURE,
        payload: {
            status: payload.status
        }
    }
}

export function initRefreshAuthToken(baseUrl, refreshToken) {

    return function (dispatch) {
        return $.ajax({
            type:       'GET',
            url:         baseUrl + '/api/auth/token',
            dataType:   'json',
            headers: {
                'X-Authorization': `Bearer ${refreshToken}`
            }
        }).then(response => {
            dispatch(setInitAfterReloadStore(response.token, refreshToken));
        }).catch(response => {
            dispatch(refreshTokenFailure(response));
        })
    }}

export function initRefreshAuthTokenRequest() {
    return {
        type: INIT_REFRESH_AUTH_TOKEN_REQUEST
    }
}

export function setInitAfterReloadStore(token, refreshToken) {
    return {
        type: INIT_STORE_AFTER_RELOAD,
        payload: {
            token: token,
            refreshToken: refreshToken
        }
    }
}

export function logoutAndRedirect(baseUrl, token) {
    return (dispatch) => {
       return $.ajax({
           type:       'GET',
           url:         baseUrl + '/api/logout',
           dataType:   'json',
           headers: {
               'X-Authorization': `Bearer ${token}`
           }
       }).
           then(function ()  {
           dispatch(logout())
       }).catch(error => {

       })
    }
}

export function logout() {
    sessionStorage.removeItem('refreshToken');
    //hashHistory.push('/login');
    location.reload();
    return {
        type: LOGOUT_USER
    }
}