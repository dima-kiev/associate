import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import Paper from 'material-ui/Paper';
import Alert from 'material-ui/svg-icons/alert/error-outline';

export class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            (!!this.props.error)
                ?
                <Paper zDepth={1} rounded={false}>
                    <div className="panel">
                        <div className="panel-heading text-center">
                            <h4><Alert color="#F44336"/><span style={{verticalAlign:4, marginLeft:10}}>
                                {this.props.error}</span></h4>
                        </div>
                    </div>
                </Paper>
                : null
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage)