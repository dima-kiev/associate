import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import {Link, RouteHandler} from "react-router";
import StatWidget from './StartWidget';

export class Test2 extends React.Component {

    constructor(props) {
        super(props);
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="page-header">
                            <h1>Home</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <StatWidget
                            style="panel-primary"
                            icon="fa fa-comments fa-5x"
                            count="26"
                            headerText="New SMS!"
                            footerText="View Details"
                            linkTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <StatWidget
                            style="panel-green"
                            icon="fa  fa-envelope fa-5x"
                            count="12"
                            headerText="New Email!"
                            footerText="View Details"
                            linkTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <StatWidget
                            style="panel-yellow"
                            icon="fa fa-bell-o fa-5x"
                            count="124"
                            headerText="New Voices!"
                            footerText="View Details"
                            linkTo="/"
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Test2)

