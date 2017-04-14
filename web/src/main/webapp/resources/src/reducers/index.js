import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import auth from './auth';
import baseUrl from './baseUrl';
import menu from './menu';
import users from './user';
import permission from './permission';


export default combineReducers({
    auth,
    baseUrl,
    menu,
    users,
    permission,

    router: routerStateReducer
});