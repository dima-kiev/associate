import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import LoginView from '../views/Login/LoginView';
import {protectedComponent} from '../components/protected';
import App from '../containers/App';
import Home from '../containers/Home';
import HomeView from '../views/HomeView';
import UserManagement from '../views/User/UserAsync';


export default(
    <Route component={App}>
        <Route path="/" component={protectedComponent(Home)}>
            <IndexRoute component={HomeView}/>
            {
                <Route path="/user" component={UserManagement}/>
            }
        </Route>
        <Route path="/login" component={LoginView}/>
    </Route>
);