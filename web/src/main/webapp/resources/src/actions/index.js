import * as auth from './authentication';
import * as baseUrl from './initBaseUrl';
import * as menu from './menu';

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
//---------------------------------------credentials
//noinspection JSUnusedGlobalSymbols
export  function getCredentialsForUser(token, baseUrl, id) {
    return credentials.getCredentialsForUser(token, baseUrl, id);
}
//noinspection JSUnusedGlobalSymbols
export function delCredentials(token, baseUrl, id, userId) {
    return credentials.delCredentials(token, baseUrl, id, userId)
}
//noinspection JSUnusedGlobalSymbols
export function getCredentialsList(baseUrl, token, data, page) {
    return credentials.getCredentialsList(baseUrl, token, data, page);
}
//noinspection JSUnusedGlobalSymbols
export function getApiTypes(token, baseUrl) {
    return credentials.getApiTypes(token, baseUrl)
}
//noinspection JSUnusedGlobalSymbols
export function getUsersCredentials(token, baseUrl) {
    return credentials.getUsersCredentials(token, baseUrl)
}
//noinspection JSUnusedGlobalSymbols
export function saveCredentials(baseUrl, token, credentials) {
    return users.saveCredentials(baseUrl, token, credentials)
}
//noinspection JSUnusedGlobalSymbols
export function updateCredentials(baseUrl, token, data, id) {
    return credentials.updateCredentials(baseUrl, token, data, id)
}
//noinspection JSUnusedGlobalSymbols
export function editCredentials(baseUrl, token, id) {
    return credentials.editCredentials(baseUrl, token, id)
}
//noinspection JSUnusedGlobalSymbols
export function credentialsSave(baseUrl, token, data) {
    return credentials.credentialsSave(baseUrl, token, data)
}
//noinspection JSUnusedGlobalSymbols
export function clearStateCredentials() {
    return credentials.clearStateCredentials()
}
//noinspection JSUnusedGlobalSymbols
export function credentialsDel(token, baseUrl, id, data, page) {
    return credentials.credentialsDel(token, baseUrl, id, data, page)
}

//noinspection JSUnusedGlobalSymbols
export function getTasks(token, baseUrl, page) {
    return tasks.getTasks(token, baseUrl, page)
}
//noinspection JSUnusedGlobalSymbols
export function download(token, baseUrl, outcome) {
    return tasks.download(token, baseUrl, outcome)
}





