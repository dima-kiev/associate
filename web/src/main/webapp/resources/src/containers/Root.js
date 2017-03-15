import React from 'react';
import {Provider} from 'react-redux';
import routes from '../routes/index';
import {ReduxRouter} from 'redux-router';
import {Router, Route,  browserHistory, hashHistory} from 'react-router';
import {initBaseUrl} from '../actions/initBaseUrl';


export default class Root extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var baseUrl = document.getElementsByName('base-url')[0].getAttribute('content');
        this.props.store.dispatch(initBaseUrl(baseUrl));
    }

    render () {
        return (
                <Provider store={this.props.store}>
                        <Router history={hashHistory}>
                            {routes}
                        </Router>
                </Provider>
        );
    }
}
