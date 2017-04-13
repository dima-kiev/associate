import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import Sidebar from "./Sidebar";
import AppBar from "material-ui/AppBar";
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import IconButton from 'material-ui/IconButton';
import Chip from 'material-ui/Chip';
import {
    cyan500,
    white,
} from "material-ui/styles/colors";
import Avatar from 'material-ui/Avatar';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import muiThemeable from 'material-ui/styles/muiThemeable';


export class Menu extends React.Component {

    constructor(props) {
        super(props);
    }

    logoutUser() {
        this.props.actions.logoutAndRedirect(this.props.baseUrl, this.props.token);
    }

    openSidebarMenu() {
        this.props.openMenu(true);
    }

    openSidebar() {
        this.props.openMenu(false);
    }

    render () {
        const style = {
            position: 'fixed',
            top: 0
        };
        return (
            <div id="wrapper" className="content">
                <AppBar
                    title="SConfirmation"
                    onLeftIconButtonTouchTap={this.openSidebarMenu.bind(this)}
                    iconElementRight={this.renderLogout()}
                    style={style}
                />
                {
                    <Sidebar open={this.props.open} openHandler={this.openSidebar.bind(this)}/>
                }
            </div>
        );
    }

    renderLogout() {
        return(
            <div className="row">
                <div className="col-sm-6" style={{paddingTop:7}}>
                    <Chip backgroundColor ={this.props.muiTheme.palette.primary1Color}
                          labelColor      ={white} >
                        <Avatar backgroundColor={this.props.muiTheme.palette.primary1Color} color={white} icon={<SvgIconFace />} />
                        {this.props.user.sub}
                    </Chip>
                </div>
                <div className="col-sm-6">
                    <IconButton tooltip="Logout" iconStyle={{color:white}} onClick={this.logoutUser.bind(this)}><Exit/></IconButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    baseUrl  : state.baseUrl.baseUrl,
    token    : state.auth.token,
    user     : state.auth.userName
});

const mapDispatchToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(Menu))