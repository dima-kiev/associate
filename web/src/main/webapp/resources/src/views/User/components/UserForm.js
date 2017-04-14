import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../../actions';
import {Link, RouteHandler} from "react-router";
import {parseId} from '../../../utils/parser';
import {validate, hasGlobalError} from '../../../utils/validator';
import ErrorMessage from '../../Error/ErrorMessage';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from "material-ui/TextField";
import SelectField from 'material-ui/SelectField';
import Overlay from "../../Overlay/Overlay";
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";


export class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: this.props.roles,
            permission: null
        };
    }

    parseArray(array) {
        let itemsArr = [];
        let empty = <MenuItem value={null} key={null} primaryText=""/>;
        itemsArr.push(empty);
        array.map((el) => {
            let elem = <MenuItem value={el.value} key={el.value} primaryText={el.label}/>;
            itemsArr.push(elem);
        });
        return itemsArr;
    }

    componentWillMount() {
        let permissions = [];
        this.props.permissionList.map((el) => {
            let permission = {label: el.content.name, value: el.content.id.toString()};
            permissions.push(permission);
        });
        this.setState({
            permission:this.parseArray(permissions)
        });
        if (!!this.props.tempUserRoles) {
            this.checkPermissionGroup(this.props.tempUserRoles)
        }
    }

    checkPermissionGroup(rol) {

        if (rol.user.length > 0) {
            let find = false;
            this.props.permissionList.map(el => {
                let permRoles = [];
                el.content.roles.map(item => {
                    permRoles.push(item.role);
                });

                let perm = permRoles.sort().join(",");
                let userRole = [];
                rol.user.map(item => {
                    userRole.push(item.role);
                });
                let user = userRole.sort().join(",");
                if (perm == user) {
                     this.props.actions.permissionFieldValue(el.content.id.toString());
                     find = true;
                }
            });
            if (!find) {
                this.props.actions.permissionFieldValue(null);
            }
        }
        if (rol.user.length == 0) {
            this.props.actions.permissionFieldValue(null);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tempUserRoles != this.props.tempUserRoles) {
             this.checkPermissionGroup(nextProps.tempUserRoles);
        }
    }

    handlerSubmit(e) {
        e.preventDefault();

        const isEnabled     = document.getElementById('ch').checked;
        const roles         = document.getElementsByName('roles');
        const firstName     = this.refs.firstName.getValue();
        const lastName      = this.refs.lastName.getValue();
        const username      = this.refs.userName.getValue();
        const pass          = this.refs.pass.getValue();

        let arr = [];
        for(let i=0; i < roles.length; i++) {
            if(roles[i].checked == true) {
                arr.push(roles[i].value);
            }
        }
        let payload = null;
        if (!!pass) {
             payload = {
                first    : firstName,
                last     : lastName,
                username : username,
                password : pass,
                isEnabled: isEnabled
            };
        } else {
             payload = {
                first    : firstName,
                last     : lastName,
                username : username,
                isEnabled: isEnabled
            };
        }

        let token = this.props.token;
        let baseUrl = this.props.baseUrl;
        let page = this.props.page;

        if (!!this.props.userTemp) {
            let roleIds = [];
            let mas = this.props.baseUserRoles.user;

            for (let k = 0; k < mas.length; k++) {
                roleIds[k] = parseId(mas[k]._links.self.href);
            }
            let id = this.props.userTemp.id;
            let user = baseUrl + "/user/" + id;
            this.props.actions.updateUser(payload, baseUrl, token, arr, id, roleIds, user);
        } else {
            this.props.actions.saveUser(payload, baseUrl, token, arr, page);
        }


    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.actionSuccess) {
            this.hideForm();
            return true;
        }
        return true;
    }

    hideForm() {
        this.props.actions.clearStateUser();
        this.props.actions.clearPermissionFieldValue();
        let token   = this.props.token;
        let baseUrl = this.props.baseUrl;
        this.props.actions.getUsers(token,baseUrl);
        this.props.open();
    }

    handlerCancel(e){
        e.preventDefault();
        // this.props.actions.editUserRequest(); // TODO ?WTF
        this.props.open();
    }

    handleSelectPermission(event, index, value) {
        this.props.actions.permissionFieldValue(value);
        !!value ? this.props.actions.findPermission(this.props.token, this.props.baseUrl, value) : null;
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return (
                <Paper zDepth={2} rounded={false}>
                    <div className="panel">
                        <div className="panel-heading">
                            <h4>User Form</h4>
                        </div>
                        <div className="panel-body">
                                {
                                    (!!this.props.rol) ? this.forms() : <Overlay show/>
                                }
                        </div>
                    </div>
                </Paper>
        );
    }

    forms() {
        return (
            <div>
                {
                    (hasGlobalError(this.props.error))? <ErrorMessage error = {this.props.error}/>: null
                }
                <div className="row">
                    <div className="col-lg-6">
                        <TextField
                            hintText            ="First Name"
                            floatingLabelText   ="First Name"
                            floatingLabelStyle  ={{fontWeight: 400}}
                            fullWidth           ={true}
                            defaultValue        ={this.props.user.first}
                            ref                 ="firstName"
                            errorText           ={validate('first', this.props.error).message}
                        />
                    </div>
                    <div className="col-lg-6">
                        <TextField
                            hintText            ="Last Name"
                            floatingLabelText   ="Last Name"
                            floatingLabelStyle  ={{fontWeight: 400}}
                            fullWidth           ={true}
                            defaultValue        ={this.props.user.last}
                            ref                 ="lastName"
                            errorText           ={validate('last', this.props.error).message}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <TextField
                            hintText            ="Username"
                            floatingLabelText   ="Username"
                            floatingLabelStyle  ={{fontWeight: 400}}
                            fullWidth           ={true}
                            defaultValue        ={this.props.user.username}
                            ref                 ="userName"
                            errorText           ={validate('username', this.props.error).message}
                        />
                    </div>
                    <div className="col-lg-6">
                        <TextField
                            hintText            ="Password"
                            floatingLabelText   ="Password"
                            type                ="password"
                            floatingLabelStyle  ={{fontWeight: 400}}
                            fullWidth           ={true}
                            ref                 ="pass"
                        />
                    </div>
                </div>
                <div className="row" style={{position:'relative'}}>
                    <div className="col-sm-6" style={{paddingBottom:4}}>
                        <SelectField
                            hintText            ="Permission Group"
                            floatingLabelText   ="Permission Group"
                            fullWidth           ={true}
                            floatingLabelStyle  ={{fontWeight: 400}}
                            value               ={this.props.permissionFieldValue}
                            onChange            ={this.handleSelectPermission.bind(this)}>
                            {this.state.permission}
                        </SelectField>
                    </div>
                    <div className="col-sm-3" style={{position:'absolute', bottom: 0, right:0}}>
                        <Checkbox
                            label="Is enabled"
                            labelPosition="left"
                            labelStyle={{fontWeight: 400}}
                            defaultChecked={!!this.props.user.isEnabled}
                            id = "ch"
                        />
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-lg-12">
                        <Paper style={{overflow:'overlay'}} zDepth={1} rounded={false}>
                            <div>
                                <div className="panel-heading">
                                    <h4>Role</h4>
                                </div>
                                <div className="panel-body" style={{minWidth:650}}>
                                    {
                                        (!!this.props.tempUserRoles) ? this.roles(this.props.tempUserRoles.user) : this.roles(this.props.rol)
                                    }
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
               <div className="row">
                    <div className="col-lg-12">
                        <hr/>
                            <RaisedButton primary={true} label="Apply" onClick={this.handlerSubmit.bind(this)}/>
                            {'  '}
                            <RaisedButton label="Cancel" onClick={this.handlerCancel.bind(this)}/>
                    </div>
                    <div className="text-danger text-right">
                        {this.props.errorText != null ? this.props.errorText : ''}
                    </div>
                </div>
            </div>
        );
    }

    roles(rol) {
        let mas = [];
        for (let i = 0; i < rol.length; i++) {
            mas[i] = rol[i].role;
        }

        return  (this.state.roles.map(function (el) {
            return (
                <div className="col-sm-6" style={{marginTop:-10}} key={el}>
                    <Checkbox
                        label           ={el}
                        labelPosition   ="right"
                        labelStyle      ={{fontWeight: 400}}
                        name            ="roles"
                        value           = {el}
                        checked         ={mas.includes(el)}
                        onClick         ={this.checkboxHandler.bind(this)}
                    />
                </div>
            );
        },this));
    }

    checkboxHandler(val) {
        let m = [];
        let mas = [];
        if (!!this.props.tempUserRoles) {
            mas = this.props.tempUserRoles.user.slice();
            mas.map(el => {
                m.push(el.role);
            });
        }
        let i = m.indexOf(val.target.value);
        if (i == -1) {
            mas.unshift({role:val.target.value});
        } else {
            mas.splice(i,1);
        }

        this.props.actions.getUserRolesSuccessTemp(mas);

    }

}

const mapStateToProps = (state) => ({
    baseUrl             : state.baseUrl.baseUrl,
    token               : state.auth.token,
    errorText           : state.users.errorText,
    saving              : state.users.isSaving,
    page                : state.users.page,
    userTemp            : state.users.tempUser,
    isDel               : state.users.isDeleting,
    actionSuccess       : state.users.actionSuccess,
    error               : state.users.errorForm,
    roles               : state.users.roles,
    permissionList      : state.permission.permissionList,
    permission          : state.permission.permission,
    tempUserRoles       : state.users.tempUserRoles,
    permissionFieldValue: state.permission.permissionFieldValue,
    baseUserRoles       : state.users.baseUserRoles
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)

