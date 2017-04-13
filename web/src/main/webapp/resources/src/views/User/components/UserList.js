import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserForm from './UserForm';
import * as actionCreators from '../../../actions';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import {Link, RouteHandler} from "react-router";
import Paginator from "../../Page/Paginator";
import ErrorMessage from "../../Error/ErrorMessage";
import Overlay from "../../Overlay/Overlay";
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

export class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isUserFormAdd : false,
            isUserFormEdit: false
        };
    }

    componentWillMount() {
        let token = this.props.token;
        let baseUrl = this.props.baseUrl;
        this.props.actions.getUsers(token,baseUrl);
        //this.props.actions.editUserRequest();
        this.props.actions.getPermissions(this.props.token, this.props.baseUrl);
    }

    navigate(id) {
        let token   = this.props.token;
        let baseUrl = this.props.baseUrl;
        let page    = this.props.page.number;
        if (this.props.userList.length == 1 && page == (this.props.page.totalPages - 1)) {
            page = page - 1;
        }
        this.props.actions.delUser(token, baseUrl, id, page);
    }

    edit(id) {
        this.props.actions.editUser(this.props.token, this.props.baseUrl, id);
        //this.props.actions.getCredentialsForUser(this.props.token, this.props.baseUrl, id);
        this.setState({isUserFormEdit:true});
    }

    openForm(e) {
        e.preventDefault();
        this.setState({isUserFormAdd:true});
        this.props.actions.clearPermissionFieldValue();
    }

    testMethod() {
        this.setState({isUserFormAdd:false, isUserFormEdit:false})
    }

    addForm() {
        let user = {
            first    : '',
            last     : '',
            username : '',
            isEnabled: ''
        };
        let rol = [];
        return (
            <UserForm open={this.testMethod.bind(this)} user={user} rol={rol}/>
        );
    }

    editForm() {
        return (
            <UserForm open={this.testMethod.bind(this)} user={this.props.user} rol={this.props.rol}/>
        );
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return(
            <div>
                <div className="col-lg-6">
                    <Paper zDepth={2} rounded={false}>
                        <div className="panel">
                            <div className="panel-heading">
                                <h4>User List</h4>
                            </div>
                            <div className="panel-body">
                                <ErrorMessage error={this.props.error}/>
                                {
                                    (!!this.props.userList) ? this.renderTable() : <Overlay show/>
                                }
                            </div>
                        </div>
                    </Paper>
                </div>
                <div className="col-lg-6">
                    {
                        this.state.isUserFormAdd ? this.addForm() : this.state.isUserFormEdit ? !!this.props.rol ? this.editForm() :
                            <Overlay show/> : ''
                    }
                </div>
            </div>
        );
    }

    renderTable() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <Table fixedHeader={false} bodyStyle={{overflow:'visible'}}>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>#</TableHeaderColumn>
                            <TableHeaderColumn>Username</TableHeaderColumn>
                            <TableHeaderColumn>First</TableHeaderColumn>
                            <TableHeaderColumn>Last</TableHeaderColumn>
                            <TableHeaderColumn>Is Enabled</TableHeaderColumn>
                            <TableHeaderColumn>Edit</TableHeaderColumn>
                            <TableHeaderColumn>Delete</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} stripedRows={true} showRowHover={true}>
                        {
                            this.props.userList.map((el) => {
                                let id = el.content.id;
                                return(
                                    <TableRow key={id}>
                                        <TableRowColumn>{id}</TableRowColumn>
                                        <TableRowColumn>{el.content.username}</TableRowColumn>
                                        <TableRowColumn>{el.content.first}</TableRowColumn>
                                        <TableRowColumn>{el.content.last}</TableRowColumn>
                                        <TableRowColumn>
                                            {el.content.isEnabled+''}
                                        </TableRowColumn>
                                        <TableRowColumn className="text-center">
                                            <RaisedButton
                                                primary={true}
                                                label="Edit"
                                                onClick={this.edit.bind(this, id)}
                                                disabled={this.state.isUserFormAdd}>
                                            </RaisedButton>
                                        </TableRowColumn>
                                        <TableRowColumn className="text-center">
                                            <RaisedButton
                                                secondary={true}
                                                label="Delete"
                                                onClick={this.navigate.bind(this, id)}
                                                disabled={this.state.isUserFormAdd}>
                                            </RaisedButton>
                                        </TableRowColumn>
                                    </TableRow>
                                );
                            }, this)
                        }

                        </TableBody>
                    </Table>
                    <Paginator page={this.props.page} method="getUsers"/>
                    <hr/>
                    <div className="text-right">
                        <RaisedButton label="Add new"
                                      onClick={this.openForm.bind(this)}
                                      disabled={this.state.isUserFormEdit}>
                        </RaisedButton>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userList : state.users.userList,
    isGetting: state.users.isGetting,
    baseUrl  : state.baseUrl.baseUrl,
    token    :  state.auth.token,
    page     : state.users.page,
    user     : state.users.tempUser,
    rol      : state.users.tempUserRoles,
    error    : state.users.errorList
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList)


