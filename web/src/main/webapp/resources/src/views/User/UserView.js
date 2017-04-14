import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar} from "react-bootstrap";
import {Link, RouteHandler} from "react-router";
import UserList from "./components/UserList";


export class UserView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.roles == null) {
            this.props.actions.getRoles(this.props.baseUrl, this.props.token)
        }
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1 className="material-ui">User Management</h1>
                        </div>
                    </div>
                    <UserList/>
                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    baseUrl: state.baseUrl.baseUrl,
    token:  state.auth.token,
    roles: state.users.roles
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView)

