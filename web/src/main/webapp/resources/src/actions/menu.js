//noinspection JSUnresolvedVariable
import {
    GET_MENU_SUCCESS,
    GET_MENU_FAILURE
} from '../constants/menu';
import $ from "jquery";

export function getMenuList(baseUrl, token) {
    return function (dispatch) {
        return $.ajax({
            type: 'GET',
            url: baseUrl + '/api/internal/menu_list',
            dataType: 'json',
            headers: {
                'X-Authorization': `Bearer ${token}`
            }
        }).then(response => {
            dispatch(getMenuListSuccess(response))
        }).catch(error => {
            dispatch(getMenuListFailure(error))
        })
    }
}

export function getMenuListSuccess(response) {
    return {
        type: GET_MENU_SUCCESS,
        payload: {
            list: response
        }
    }
}

export function getMenuListFailure(error) {
    return {
        type: GET_MENU_FAILURE,
        payload: {
            error: error
        }
    }
}