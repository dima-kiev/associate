import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import Overlay from "../Overlay/Overlay";
import {Link, RouteHandler} from "react-router";



export class UserAsync extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            component:null
        };
    }

    componentDidMount() {

        require.ensure([], (require) => {
            const Component = require('./UserView').default;
            this.setState({component:Component})
        })
    }

    //noinspection JSMethodCanBeStatic
    render() {
        if (this.state.component) {
            return <this.state.component/>
        }
        return (<div className="marginTop-70"><Overlay show/></div>);
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAsync)





