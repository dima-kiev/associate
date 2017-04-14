    import $ from "jquery";
    import {browserHistory, hashHistory} from "react-router";
    import {push, replace} from "redux-router";
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
    } from "../constants/permission";
    //noinspection JSUnresolvedVariable
    import {getUserRolesSuccessTemp} from './index';

    export function getPermissionsSuccess(response, page) {

        return {
            type: GET_PERMISSIONS_SUCCESS,
            payload: {
                permissionList : response,
                page : page
            }
        }
    }

    export function getPermissionsRequest() {
        return {
            type: GET_PERMISSIONS_REQUEST
        }
    }

    export function getPermissionsFailure(error) {
        return {
            type: GET_PERMISSIONS_FAILURE,
            payload: {
                message: error
            }
        }
    }
    export function delPermissionSuccess() {
        return {
            type: DEL_PERMISSION_SUCCESS
        }
    }

    export function delPermissionRequest() {
        return {
            type: DEL_PERMISSION_REQUEST
        }
    }

    export function delPermissionFailure(response) {
        return {
            type: DEL_PERMISSION_FAILURE,
            payload: {
                message: response
            }
        }
    }
    export function getPermissions(token, baseUrl) {
        return function (dispatch) {

            dispatch(getPermissionsRequest());

            return $.ajax({
                type:       'GET',
                url:         baseUrl + "/api/internal/permissionGroups",
                dataType:   'json',
                headers: {
                    'X-Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    try {
                        dispatch(getPermissionsSuccess(response._embedded.permissionGroups));
                    } catch (e) {
                        dispatch(getPermissionsFailure());
                    }
                })
                .catch(error => {
                    let message = error.responseJSON || error.responseText;
                    dispatch(getPermissionsFailure(message.message || message))
                })
        }
    }

    export function delPermission(token, baseUrl, id, page, name) {
        return function (dispatch) {
            dispatch(delPermissionRequest());
            return $.ajax({
                type:       'DELETE',
                url:         baseUrl + '/api/internal/permissionGroups/' + id,
                dataType:   'json',
                headers: {
                    'X-Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    try {
                        dispatch(delPermissionSuccess());
                        dispatch(searchPermissionGroupByName(token,baseUrl,name,page))
                    } catch (e) {
                        dispatch(delPermissionFailure(e));
                    }
                })
                .catch(error => {
                    let message = error.responseJSON || error.responseText;
                    dispatch(delPermissionFailure(message.message || message))
                })
        }
    }


    export function savePermissionRequest(data) {
        return {
            type: SAVE_PERMISSION_REQUEST,
            payload: {
                permission: data
            }
        }
    }

    export function savePermissionSuccess() {
        return {
            type: SAVE_PERMISSION_SUCCESS
        }
    }

    export function savePermissionFailure(response) {
        return {
            type: SAVE_PERMISSION_FAILURE,
            payload: {
                message: response
            }
        }
    }

    export function savePermission(data, baseUrl, token, arr) {
        return function (dispatch) {
            dispatch(savePermissionRequest(data));
            return $.ajax({
                type:       'POST',
                url:         baseUrl + '/api/internal/permissionGroups',
                contentType: 'application/json',
                headers: {
                    'X-Authorization': `Bearer ${token}`
                },
                data: JSON.stringify(data)
            }).then(response => {
                for (let i = 0; i < arr.length; i++) {
                    $.ajax({
                        type: 'POST',
                        url: baseUrl + '/api/internal/permissionGroupsRoles',
                        contentType: 'application/json',
                        headers: {
                            'X-Authorization': `Bearer ${token}`
                        },
                        data: JSON.stringify({
                            role           : arr[i],
                            permissionGroup: response._links.self.href
                        })
                    })
                }
                return data;
            }).then(() => {
                dispatch(savePermissionSuccess());
            })
                .catch(error => {
                    let message = error.responseJSON || error.responseText;
                    dispatch(savePermissionFailure(message.message || message))
                })

        }
    }


    export function updPermissionRequest() {
        return {
            type: UPD_PERMISSION_REQUEST
        }
    }

    export function updPermissionSuccess() {
        return {
            type: UPD_PERMISSION_SUCCESS
        }
    }

    export function updPermissionFailure(error) {
        return {
            type: UPD_PERMISSION_FAILURE,
            payload: {
                error: error
            }
        }
    }

    export function updPermission(data, id, baseUrl, token, arr) {
        return function (dispatch) {
            dispatch(updPermissionRequest(data));
            return $.ajax({
                type:       'PATCH',
                url:         baseUrl + '/api/internal/permissionGroups/' + id,
                contentType: 'application/json',
                headers: {
                    'X-Authorization': `Bearer ${token}`
                },
                data:  JSON.stringify(data)
            }).then(() => {
                $.ajax({
                    type:       'POST',
                    url:         baseUrl + '/api/internal/permissionGroups/update?permission=' + id + '&arr[]=' + arr,
                    contentType: 'application/json',
                    headers: {
                        'X-Authorization': `Bearer ${token}`
                    }
                }).then(() => {
                    dispatch(updPermissionSuccess());

                })
            })
                .catch(error => {
                    let message = error.responseJSON || error.responseText;
                    dispatch(updPermissionFailure(message.message || message))
                })
        }
    }

    export function getPermissionRequest() {
        return {
            type: GET_PERMISSION_REQUEST
        }
    }

    export function getPermissionSuccess(response) {
        return {
            type: GET_PERMISSION_SUCCESS,
            payload: {
                permission : response
            }
        }
    }

    export function getPermissionFailure() {
        return {
            type: GET_PERMISSION_FAILURE
        }
    }

    export function findPermission(token, baseUrl, id) {
        return function (dispatch) {

            dispatch(getPermissionRequest());
            return $.ajax({
                type:       'GET',
                url:         baseUrl + "/api/internal/permissionGroups/" + id,
                dataType:   'json',
                headers: {
                    'X-Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    try {
                        dispatch(getPermissionSuccess(response));
                        dispatch(getUserRolesSuccessTemp(response.content.roles))
                    } catch (e) {
                        dispatch(getPermissionFailure());
                    }
                })
                .catch(error => {
                    dispatch(getPermissionFailure(error))
                })
        }
    }

    export function clearStateRequest() {
        return {
            type: CLEAR_PERMISSION
        }
    }

    export function clearStatePermission() {
        return function (dispatch) {
            dispatch(clearStateRequest());
        }
    }

    export function searchPermissionGroupByName(token, baseUrl, name, page) {
        return function (dispatch) {
            page = page || 0;
            dispatch(getPermissionsRequest());
            return $.ajax({
                type:       'GET',
                url:         baseUrl + "/api/internal/permissionGroups/search/findAllPermissionGroupByName?name=" + name + '&page='+ page + '&size=10',
                dataType:   'json',
                headers: {
                    'X-Authorization': `Bearer ${token}`
                }
            }).then(response => {
                dispatch(getPermissionsSuccess(response._embedded.permissionGroups, response.page));
            }).catch(error => {
                let message = error.responseJSON || error.responseText;
                dispatch(getPermissionsFailure(message.message || message))
            })
        }
    }

    export function permissionFieldValue(resp) {
        return {
            type: PERMISSION_FIELD_VALUE,
            payload:{
                permissionFieldValue:resp
            }
        }
    }

    export function clearPermissionFieldValue() {
        return {
            type: CLEAR_PERMISSION_FIELD_VALUE

        }
    }
