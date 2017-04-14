import $ from 'jquery';
import { browserHistory, hashHistory } from 'react-router';
import { push, replace } from 'redux-router';
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
    GET_USER_ROLES_TEMP
} from '../constants/user';

export function getUsersSuccess(response, page) {
    return {
        type: GET_USERS_SUCCESS,
        payload: {
            usersList : response,
            page : page
        }
    }
}

export function getAssignedUsersSuccess(response) {
    return {
        type: GET_ASSIGNED_SUCCESS,
        payload: {
            userList: response
        }
    }
}

export function getUsersRequest() {
    return {
        type: GET_USERS_REQUEST
    }
}

export function getUsersFailure(error) {
    return {
        type: GET_USERS_FAILURE,
        payload: {
            error: error
        }
    }
}

export function delUsersSuccess(response) {

    return {
        type: DEL_USERS_SUCCESS,
        payload: {
            usersList : response
        }
    }
}

export function delUsersRequest() {
    return {
        type: DEL_USERS_REQUEST
    }
}

export function delUsersFailure(response) {
    return {
        type: DEL_USERS_FAILURE,
        payload: {
            error: response
        }
    }
}

export function getUsers(token, baseUrl, page) {
    return function (dispatch) {
        dispatch(getUsersRequest());
        page = page || 0;
        return $.ajax({
            type:       'GET',
            url:         baseUrl + '/api/internal/users?page=' + page + "&size=20",
            dataType:   'json',
            headers: {
                'X-Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                try {
                    //noinspection JSUnresolvedVariable
                    dispatch(getUsersSuccess(response._embedded.users, response.page));
                } catch (e) {
                    dispatch(getUsersFailure());
                }
            })
            .catch(error => {
                let message = error.responseJSON || error.responseText;
                dispatch(getUsersFailure(message.message || message))
            })
    }
}

export function delUser(token, baseUrl, id, page) {
    return function (dispatch) {
        dispatch(delUsersRequest());
        return $.ajax({
            type:       'DELETE',
            url:         baseUrl + '/api/internal/users/' + id,
            dataType:   'json',
            headers: {
                'X-Authorization': `Bearer ${token}`
            }
        })
            .then(function () {
                try {
                    dispatch(delUsersSuccess());
                    dispatch(getUsers(token, baseUrl, page));
                } catch (e) {
                    dispatch(delUsersFailure());
                }
            })
            .catch(error => {
                //noinspection JSUnresolvedVariable
                let message = error.responseJSON || error.responseText;
                dispatch(delUsersFailure(message.message || message))
            })
    }
}

export function saveUserRequest() {
    return {
        type: SAVE_USER_REQUEST
    }
}

export function saveUserSuccess() {
    return {
        type: SAVE_USER_SUCCESS
    }
}

export function saveUserFailure(e) {
    return {
        type: SAVE_USER_FAILURE,
        payload: {
            error: e
        }
    }
}

export function saveUser(data, baseUrl, token, arr, page) {
    return function (dispatch) {
        dispatch(saveUserRequest());
        return $.ajax({
            type: 'POST',
            url: baseUrl + '/api/internal/users',
            contentType: 'application/json',
            headers: {
                'X-Authorization': `Bearer ${token}`
            },
            data: JSON.stringify(data)
        }).then(response => {
            try {
                dispatch(saveUserSuccess());
                //noinspection JSUnresolvedVariable
                if (arr.length > 0) {
                    dispatch(saveUserRole(response._links.self.href, baseUrl, token, arr));
                }
                dispatch(getUsers(token, baseUrl, page));
            } catch (e) {
                dispatch(saveUserFailure(e))
            }
        })
            .catch(error => {
                //noinspection JSUnresolvedVariable
                let message = error.responseJSON || error.responseText;
                dispatch(saveUserFailure(message.message || message))
            })

    }
}

export function saveUserRole(response, baseUrl, token, arr) {
    return function (dispatch) {
        dispatch(saveUserRoleRequest());
        return function () {
            let data;
            for (let i = 0; i < arr.length; i++) {
                data =  $.ajax({
                    type: 'POST',
                    url: baseUrl + '/api/internal/userRoles',
                    contentType: 'application/json',
                    headers: {
                        'X-Authorization': `Bearer ${token}`
                    },
                    data: JSON.stringify({
                        role: arr[i],
                        user: response
                    })
                })
            }
            return data;
        }().then(response => {
            try {
                dispatch(saveUserRoleSuccess(response));
            } catch (e) {
                dispatch(saveUserRoleFailure(e))
            }
        })
            .catch(e => {
                dispatch(saveUserRoleFailure(e))
            })

    }
}

export function saveUserRoleRequest() {
    return {
        type: SAVE_USER_ROLE_REQUEST
    }
}

export function saveUserRoleSuccess() {
    return {
        type: SAVE_USER_ROLE_SUCCESS
    }
}

export function saveUserRoleFailure(e) {
    return {
        type: SAVE_USER_ROLE_FAILURE,
        payload : {
            error : e
        }
    }
}

export function editUser(token, baseUrl, id) {
    return function (dispatch) {
        dispatch(editUserRequest());
        return $.ajax({
            type:       'GET',
            url:         baseUrl + '/api/internal/users/' + id,
            dataType:   'json',
            headers: {
                'X-Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                {
                    try {
                        dispatch(editUserSuccess(response.content));
                        dispatch(getUserRoles(token, baseUrl, id));
                    } catch (e) {
                        dispatch(editUserFailure(e));
                    }
                }})
            .catch(error => {
                dispatch(editUserFailure(error))
            })
    }
}

export function editUserRequest() {
    return {
        type: EDIT_USER_REQUEST
    }
}

export function editUserSuccess(response) {
    return {
        type: EDIT_USER_SUCCESS,
        payload: {
            user:response
        }
    }
}

export function editUserFailure(e) {
    return {
        type: EDIT_USER_FAILURE,
        payload : {
            error : e
        }
    }
}

export function getUserRoles(token, baseUrl, id) {
    return function (dispatch) {
        dispatch(getUserRolesRequest());
        return $.ajax({
            type:       'GET',
            url:         baseUrl + '/api/internal/userRoles/search/findByUserId?user=' + id,
            dataType:   'json',
            headers: {
                'X-Authorization': `Bearer ${token}`,
            }})
            .then(response => {
                {
                    try {
                        dispatch(getUserRolesSuccess(response._embedded.userRoles))
                    } catch (e) {
                        dispatch(getUserRolesFailure(e));
                    }
                }})
            .catch(error => {
                dispatch(getUserRolesFailure(error))
            })
    }
}

export function getUserRolesRequest() {
    return {
        type: GET_USER_ROLES_REQUEST
    }
}

export function getUserRolesSuccess(response) {
    return {
        type: GET_USER_ROLES_SUCCESS,
        payload: {
            user:response
        }
    }
}

export function getUserRolesFailure(e) {
    return {
        type: GET_USER_ROLES_FAILURE,
        payload : {
            error : e
        }
    }
}

export function updateUser(data, baseUrl, token, arr, id, roleId, user) {
    return function (dispatch) {
        dispatch(updateUserRequest());
        return $.ajax({
            type:       'PATCH',
            url:         baseUrl + '/api/internal/users/'  + id,
            contentType: 'application/json',
            headers: {
                'X-Authorization': `Bearer ${token}`
            },
            data: JSON.stringify(data)
        })
            .then(response => {
                dispatch(updateUserSuccess(response));
                if (roleId.length > 0) {
                    dispatch(deleteUserRole(baseUrl, token, roleId, arr, user));
                } else {
                    dispatch(deleteUserRoleIsEmpty(baseUrl, token, arr, user));
                }
            }).catch(error => {
                //noinspection JSUnresolvedVariable
                let message = error.responseJSON || error.responseText;
                dispatch(updateUserFailure(message.message || message))
            })
    }
}

export function updateUserRequest() {
    return {
        type: UPDATE_USER_REQUEST
    }
}

export function updateUserSuccess(response) {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: {
            user:response
        }
    }
}

export function updateUserFailure(e) {
    return {
        type: UPDATE_USER_FAILURE,
        payload : {
            error : e
        }
    }
}

export function deleteUserRole(baseUrl, token, roleIds, arr, user) {
    return function (dispatch) {
        dispatch(deleteUserRoleRequest());
        return function(){
            let response;
            for (let i = 0; i < roleIds.length; i++) {
                response = $.ajax({
                    type:       'DELETE',
                    url:         baseUrl + '/api/internal/userRoles/' + roleIds[i],
                    contentType: 'application/json',
                    headers: {
                        'X-Authorization': `Bearer ${token}`
                    }
                });
            }
            return response;
        }()
            .then(response => {
                {
                    try {
                        dispatch(deleteUserRoleSuccess(response));
                        if (arr.length > 0) {
                            dispatch(saveUserRole(user, baseUrl, token, arr))
                        }
                    } catch (e) {
                        dispatch(deleteUserRoleFailure(e));
                    }
                }})

    }
}

export function deleteUserRoleIsEmpty(baseUrl, token, arr, user) {
    return function (dispatch) {
        if (arr.length > 0) {
            dispatch(saveUserRole(user, baseUrl, token, arr))
        }
    }

}

export function deleteUserRoleRequest() {
    return {
        type: DEL_USER_ROLES_REQUEST
    }
}

export function deleteUserRoleSuccess(response) {
    return {
        type: DEL_USER_ROLES_SUCCESS,
        payload: {
            user:response
        }
    }
}

export function deleteUserRoleFailure(e) {
    return {
        type: DEL_USER_ROLES_FAILURE,
        payload : {
            error : e
        }
    }
}

export function clearStateUser() {
    return {
        type: CLEAR_STATE
    }
}


export function getUsersByName(token, baseUrl, name, page) {
    return function (dispatch) {
        dispatch(getUsersRequest());
        page = page || 0;
        return $.ajax({
            type:       'GET',
            url:         baseUrl + '/api/internal/users/search/findByUsernameStartsWithAndCustomerIdIsNull' +
            '?username=' + name + "&page=" + page,
            dataType:   'json',
            headers: {
                'X-Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                try {
                    dispatch(getUsersSuccess(response._embedded.users, response.page));
                } catch (e) {
                    dispatch(getUsersFailure());
                }
            })
            .catch(error => {
                dispatch(getUsersFailure(error))
            })
    }
}



export function getRoles(baseUrl, token) {
    return function (dispatch) {
        dispatch(getRolesRequest());
        return $.ajax({
            type: 'GET',
            url: baseUrl + '/api/internal/roles',
            dataType: 'json',
            headers: {
                'X-Authorization': `Bearer ${token}`
            }
        }).
        then(response => {
            dispatch(getRolesSuccess(response))
        }).catch(error => {
            dispatch(getRolesFailure(error))
        })
    }
}

export function getRolesRequest() {
    return {
        type: GET_ROLES_REQUEST
    }
}

export function getRolesSuccess(response) {
    return {
        type: GET_ROLES_SUCCESS,
        payload: {
            roles: response
        }
    }
}

export function getRolesFailure(error) {
    return {
        type: GET_ROLES_FAILURE,
        payload: {
            error: error
        }
    }
}

export function getUserRolesSuccessTemp(resp) {
    return {
        type: GET_USER_ROLES_TEMP,
        payload: {
            user: resp
        }
    }
}