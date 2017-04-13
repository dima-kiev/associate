import * as auth from './authentication';
import * as baseUrl from './initBaseUrl';
import * as menu from './menu';
import * as users from './user';
import * as permissions from './permission';

// ------------------------------------- authentication.js
//noinspection JSUnusedGlobalSymbols
export function loginUserSuccess(token, refreshToken) {
    return auth.loginUserSuccess(token, refreshToken);
}

//noinspection JSUnusedGlobalSymbols
export function loginUserFailure(error) {
    return auth.loginUserFailure(error);
}

//noinspection JSUnusedGlobalSymbols
export function loginUserRequest() {
    return auth.loginUserRequest();
}
//noinspection JSUnusedGlobalSymbols
export function loginUser(username, password, baseUrl) {
    return auth.loginUser(username, password, baseUrl)
}
//noinspection JSUnusedGlobalSymbols
export function refreshAuthToken(baseUrl, token) {
    return auth.refreshAuthToken(baseUrl, token);
}
//noinspection JSUnusedGlobalSymbols
export function setRefreshToken(token) {
    return auth.setRefreshToken(token);
}
//noinspection JSUnusedGlobalSymbols
export function logoutAndRedirect(baseUrl,token) {
    return auth.logoutAndRedirect(baseUrl, token)
}

//noinspection JSUnusedGlobalSymbols
export function setInitAfterReloadStore(token, refreshToken) {
    return auth.setInitAfterReloadStore(token, refreshToken)
}

//noinspection JSUnusedGlobalSymbols
export function initRefreshAuthTokenRequest() {
    return auth.initRefreshAuthTokenRequest()
}

//noinspection JSUnusedGlobalSymbols
export function refreshTokenFailure(payload) {
    return auth.refreshTokenFailure(payload)
}

// --------------------------------------initBaseUrl.js

//noinspection JSUnusedGlobalSymbols
export function initBaseUrl(path) {
   return baseUrl.initBaseUrl(path)
}


//noinspection JSUnusedGlobalSymbols
export function initAfterReloadStore(token, refreshToken) {
    return auth.initAfterReloadStore(token, refreshToken);
}
//noinspection JSUnusedGlobalSymbols
export function initRefreshAuthToken(baseUrl, refreshToken) {
    return auth.initRefreshAuthToken(baseUrl, refreshToken)
}


//---------------------------------------menu
//noinspection JSUnusedGlobalSymbols
export function getMenuList(baseUrl, token) {
    return menu.getMenuList(baseUrl, token)
}

// --------------------------------------user management

//noinspection JSUnusedGlobalSymbols
export function getUsers(token, baseUrl, page) {
    return users.getUsers(token, baseUrl, page)
}

//noinspection JSUnusedGlobalSymbols
export function getUsersByName(token, baseUrl, name, page) {
    return users.getUsersByName(token, baseUrl, name, page)
}

//noinspection JSUnusedGlobalSymbols
export function delUser(token, baseUrl, id, page) {
    return users.delUser(token, baseUrl, id, page)
}

//noinspection JSUnusedGlobalSymbols
export function saveUser(data, baseUrl, token, arr, page) {
    return users.saveUser(data, baseUrl, token, arr, page)
}

//noinspection JSUnusedGlobalSymbols
export function saveUserRole(data, baseUrl, token, arr) {
    return users.saveUserRole(data, baseUrl, token, arr)
}

//noinspection JSUnusedGlobalSymbols
export function updateUser(data, baseUrl, token, arr, id, roleId, user) {
    return users.updateUser(data, baseUrl, token, arr, id, roleId, user)
}
//noinspection JSUnusedGlobalSymbols
export function deleteUserRole(baseUrl, token, roleIds, arr, user) {
    return users.deleteUserRole(baseUrl, token, roleIds, arr, user)
}
//noinspection JSUnusedGlobalSymbols
export function editUserRequest() {
    return users.editUserRequest()
}
//noinspection JSUnusedGlobalSymbols
export function clearStateUser() {
    return users.clearStateUser()
}
//noinspection JSUnusedGlobalSymbols
export function getRoles(baseUrl, token) {
    return users.getRoles(baseUrl, token)
}
//noinspection JSUnusedGlobalSymbols
export function editUser(token, baseUrl, id) {
    return users.editUser(token, baseUrl, id)
}
//noinspection JSUnusedGlobalSymbols
export function getUserRolesSuccessTemp(resp) {
    return users.getUserRolesSuccessTemp(resp)
}


//----------------------------------------------------permission
//noinspection JSUnusedGlobalSymbols
export function getPermissions(token, baseUrl) {
    return permissions.getPermissions(token, baseUrl)
}
//noinspection JSUnusedGlobalSymbols
export function delPermission(token, baseUrl, id, page, name) {
    return permissions.delPermission(token, baseUrl, id, page, name)
}
//noinspection JSUnusedGlobalSymbols
export function savePermission(data, baseUrl, token, page, arr) {
    return permissions.savePermission(data, baseUrl, token, page, arr)
}
//noinspection JSUnusedGlobalSymbols
export function updPermission(data, id, baseUrl, token, arr) {
    return permissions.updPermission(data, id, baseUrl, token, arr)
}
//noinspection JSUnusedGlobalSymbols
export function getPermissionRequest() {
    return permissions.getPermissionRequest()
}
//noinspection JSUnusedGlobalSymbols
export function findPermission(token, baseUrl, id) {
    return permissions.findPermission(token, baseUrl, id)
}
//noinspection JSUnusedGlobalSymbols
export function clearStatePermission() {
    return permissions.clearStatePermission()
}
//noinspection JSUnusedGlobalSymbols
export function searchPermissionGroupByName(token, baseUrl, name, page) {
    return permissions.searchPermissionGroupByName(token, baseUrl, name, page)
}
//noinspection JSUnusedGlobalSymbols
export function permissionFieldValue(resp) {
    return permissions.permissionFieldValue(resp)
}
//noinspection JSUnusedGlobalSymbols
export function clearPermissionFieldValue() {
    return permissions.clearPermissionFieldValue()
}









