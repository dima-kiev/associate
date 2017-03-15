import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar} from "react-bootstrap";
import {Link, RouteHandler} from "react-router";
import muiThemeable from 'material-ui/styles/muiThemeable';


export class Footer extends React.Component {

    constructor(props) {
        super(props);
    }
    //noinspection JSMethodCanBeStatic
    render() {
        var style = {
            height          : 40,
            borderTopWidth  :'1px',
            borderTopColor  :this.props.muiTheme.palette.borderColor,
            borderTopStyle  :'solid',
            backgroundColor :'#EEEEEE',
            color           : this.props.muiTheme.palette.textColor,
            marginLeft      :'256px',
            boxShadow       : '0px 3px 10px'
        };
        return (
            <div className="marginTop-20" role="navigation" id="footer" style={style}>

                    <div className="container" style={{marginTop:10}}>
                        <div className="row">
                            <div className="col-sm-6">
                                <b>Version</b> 0.01a
                            </div>
                            <div className="col-sm-6">
                                <strong>ITSupportMe 2016</strong> All Rights reserved
                            </div>
                        </div>
                    </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(Footer))

