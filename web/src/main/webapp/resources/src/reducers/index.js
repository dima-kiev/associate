import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import auth from './auth';
import baseUrl from './baseUrl';
import menu from './menu';


export default combineReducers({
    auth,
    baseUrl,
    menu,

    router: routerStateReducer
});