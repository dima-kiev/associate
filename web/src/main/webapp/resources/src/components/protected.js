import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router'

import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

export function protectedComponent(Component) {
    class AuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
        }

        componentWillMount() {
            var refreshToken = sessionStorage.getItem('refreshToken');

             if (!!refreshToken) {
                 var baseUrl = this.props.baseUrl;
                 this.props.actions.initRefreshAuthToken(baseUrl, refreshToken);
                 if (!!this.props.status) {
                     hashHistory.push('login');
                 }
            } else {
                  hashHistory.push('login');
              }
        }


        render() {
            return (
                <div>
                    {(!!this.props.isAuthenticated) ? <Component {...this.props}/> : null}
                </div>
            );
        }
    }

    const mapStateToProps = (state) => ({
        baseUrl: state.baseUrl.baseUrl,
        status: state.auth.status,
        token: state.auth.initToken,
        isAuthenticated: state.auth.isAuthenticated
    });

    const mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(actionCreators, dispatch)
    });

   return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);

}