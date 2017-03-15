import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar, Panel} from "react-bootstrap";
import {Link, RouteHandler} from "react-router";


export class StartWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return (
            <Panel
                className={this.props.style}
                header={<div className="row">
                    <div className="col-xs-3">
                        <i className={this.props.icon}/>
                    </div>
                    <div className="col-xs-9 text-right">
                        <div className="huge">
                            {
                                this.props.count
                            }
                        </div>
                        <div>
                            {
                                this.props.headerText
                            }
                        </div>
                    </div>
                </div>}
                footer={<Link to={this.props.linkTo}>
            <span className="pull-left">
              {
                  this.props.footerText
              }
            </span>
                        <span className="pull-right"><i className="fa fa-arrow-circle-right"/></span>
                        <div className="clearfix"/>
                    </Link>}
            />
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StartWidget)


