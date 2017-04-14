import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import Paper from 'material-ui/Paper';
import Warning from 'material-ui/svg-icons/alert/warning';

export class NotFoundMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <Paper zDepth={1} rounded={false} style={{marginTop:20}}>
                <div className="panel">
                    <div className="panel-heading text-center">
                                <h4><Warning color="#FF9800"/><span style={{verticalAlign:4, marginLeft:10}}>
                                    {this.props.name ? this.props.name : "Not found"}</span></h4>
                    </div>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundMessage)