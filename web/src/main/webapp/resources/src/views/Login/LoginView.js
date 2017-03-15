import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import "./style.css";
import muiThemeable from 'material-ui/styles/muiThemeable';

export class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputUsername: null,
            inputPassword: null
        }
    }

    componentDidMount() {
        this.refs.login.focus();
    }

    login(e) {
        e.preventDefault();
        var username = !!this.state.inputUsername ? this.state.inputUsername.trim() : null;
        var password = !!this.state.inputPassword ? this.state.inputPassword.trim() : null;
        var baseUrl  = this.props.baseUrl;
        this.props.actions.loginUser(username, password, baseUrl);
    }

    handlerUsername(val) {
        this.setState({inputUsername:!!val ? val.target.value : null})
    }

    handlerPassword(val) {
        this.setState({inputPassword:!!val ? val.target.value : null})
    }

    render () {
        var backgroundStyle = {
            backgroundColor : this.props.muiTheme.palette.primary1Color,
            width           : '100%',
            minHeight       : '100vh',
            maxHeight       : '100%',
            position        : 'absolute',
            top             : 0,
            left            : 0,
            margin          : '0 auto'
        };

        return (
            <div style={backgroundStyle}>
                <div className="col-md-4 col-md-offset-4">
                    <div className="borderNone login-panel panel">
                        <div className="panel-style panel-heading text-center">
                            <h4>Please Sign Into the Associate system</h4>
                        </div>
                        <div className="panel-body">
                            <form role="form" id="login-form">
                                <fieldset>
                                    <div className="form-group">
                                        <TextField
                                            hintText  ="Username"
                                            fullWidth ={true}
                                            onChange  ={this.handlerUsername.bind(this)}
                                            ref       ="login"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            hintText    ="Password"
                                            fullWidth   ={true}
                                            type        ="password"
                                            onChange    ={this.handlerPassword.bind(this)}
                                        />
                                    </div>
                                    <div className="text-right" style={{marginTop: '-9px'}}>
                                        <RaisedButton
                                            label   ="Login"
                                            type    ="submit"
                                            onClick ={this.login.bind(this)}
                                            primary ={true}
                                        />
                                    </div>
                                    {this.props.statusText ?
                                        <div className="error-text text-danger">{this.props.statusText}</div> : null}
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticating   : state.auth.isAuthenticating,
    statusText         : state.auth.statusText,
    baseUrl            : state.baseUrl.baseUrl
});

const mapDispatchToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(LoginView))