import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import RefreshIndicator from 'material-ui/RefreshIndicator';

export class Overlay extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    //noinspection JSMethodCanBeStatic
    render() {
        const style = {
            container: {
                position: 'relative',
            },
            refresh: {
                display: 'inline-block',
                position: 'relative',
            },
        };
        return (
            <div className="col-lg-12">
                <div className="col-md-4 col-md-offset-4 text-center">
                    <div style={style.container}>
                        <RefreshIndicator
                            size={50}
                            left={0}
                            top={0}
                            loadingColor="#FF9800"
                            status="loading"
                            style={style.refresh}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)