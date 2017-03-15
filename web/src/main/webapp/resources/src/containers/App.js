import React from "react";
import {Link} from "react-router";
import {push, replace} from "redux-router";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../actions";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import "../style.css";
import DefaultTheme from '../themeDefault.js';
const muiTheme = getMuiTheme(DefaultTheme);

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
           setInterval(() => {
                this.timerToken()
            }, 60000);
    }


    timerToken() {
        const min = 60;
        var currentTime = new Date().getTime() / 1000;
        var tokenTime = this.props.timeToken;
        var timeEnd = tokenTime - currentTime;

        if (timeEnd < min && this.props.isAuthenticated) {
            var refreshToken = this.props.refreshToken;
            var baseUrl = this.props.baseUrl;
            this.props.actions.refreshAuthToken(baseUrl, refreshToken);
        }
    }

    render () {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="content-color">
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    refreshToken: state.auth.refreshToken,
    timeToken: state.auth.tokenTime,
    baseUrl: state.baseUrl.baseUrl,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
