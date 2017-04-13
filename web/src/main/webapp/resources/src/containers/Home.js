import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import Menu from '../views/Menu/Menu';
import Footer from '../views/Menu/Footer';
import LinearProgress from 'material-ui/LinearProgress';


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    componentWillMount() {
        this.props.actions.getMenuList(this.props.baseUrl, this.props.token);
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return (
            (!!this.props.menu) ? this.renderApp() :  <LinearProgress mode="indeterminate" />
        );
    }

    openMenu(val) {
        this.setState({open:val})
    }

    renderApp() {
        return (
            <div>
                <Menu openMenu={this.openMenu.bind(this)} open={this.state.open}/>
                <div id="page-wrapper" className="page-wrapper" style={{minHeight:990, marginTop:35, marginLeft:(!!this.state.open) ? null : '0px'}}>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token  :  state.auth.token,
    baseUrl:  state.baseUrl.baseUrl,
    menu   :  state.menu.menuList
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
