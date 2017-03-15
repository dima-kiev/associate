import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../actions";
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    ProgressBar,
    Form,
    FormGroup,
    InputGroup,
    FormControl,
    Button
} from "react-bootstrap";
import {Link, RouteHandler, browserHistory, hashHistory} from "react-router";
import {push, replace} from "redux-router";
import "./style.css";
import Drawer from "material-ui/Drawer";
import AppBar from "material-ui/AppBar";
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {fade} from "material-ui/utils/colorManipulator";
import {
    grey900,
    grey100
} from "material-ui/styles/colors";

//noinspection JSUnresolvedVariable

export class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItem: null,
            phone:null,
            selectListItem: 1,
            open: false
        };
    }

    componentWillMount() {
        var arr = this.parserMenu(this.props.menu);
        this.setState({
            menuItem: arr
        });
        console.log(arr);
    }

    parserMenu(mas) {
        var r = this.props.role;
        var arr = [];
        var k = 0;
        for (var i = 0; i < mas.length; i++) {
            var roleList = mas[i].roles;
            if (!!mas[i].roles) {
                var includes = true;
                for (var t = 0; t < roleList.length; t++) {
                    if (!r.includes(roleList[t])) {
                        includes = false;
                        break;
                    }
                }
                if (includes) {
                    if (!!mas[i].children) {
                        let m = this.parserMenu(mas[i].children);
                        if (m.length > 0) {
                            arr[k] = mas[i];
                            arr[k].children = m;
                        }
                    } else {
                        arr[k] = mas[i];
                    }
                }
            } else {
                arr[k] = mas[i];
            }

            k++;
        }
        return arr;
    }

    search(e) {
        e.preventDefault();
        const phone = ReactDOM.findDOMNode(this.refs.phone).value;

        var data = {};
        data["phone1"] = phone;

        var filter = {
            "phone": phone
        };
        this.props.actions.saveFilter(filter);
        this.props.actions.getConfirmations(this.props.token, this.props.baseUrl, data);
        hashHistory.push('/search');
    }

    //noinspection JSMethodCanBeStatic
    render() {
        return (
            this.renderMenu1()
        );
    }

    openSidebar() {
        this.props.openHandler();
    }

    menuClick(id) {
       this.setState({selectListItem:id})
    }

    renderMenu1() {
        return (
            <Drawer open={this.props.open}>
                <AppBar
                    title="SConfirmation"
                    onLeftIconButtonTouchTap={this.openSidebar.bind(this)}
                />
                <List style={{fontSize:15}}>
                    {
                        this.state.menuItem.map(function (el) {
                            const isAllocate = {
                                backgroundColor:fade(grey900, 0.07),
                                fontSize: 15
                            };
                            const styleListItem = {
                                fontSize: 15
                            };
                            const isAllocateChild = {
                                backgroundColor:fade(grey900, 0.07),
                                fontSize: 12,
                                hoverColor:fade(grey900, 0.07)
                            };
                            const styleChild = {
                                fontSize: 12,
                                hoverColor:fade(grey900, 0.07)
                            };
                            const styleFontIcon = {
                                fontSize: 15,
                                margin:10,
                                left: 30
                            };
                            if (!!el.children) {

                                let children = [];
                                el.children.map(item => {
                                    children.push((
                                        <ListItem
                                            style={(this.state.selectListItem == item.id) ? isAllocateChild : styleChild}
                                            key={item.id}
                                            primaryText={item.title}
                                            onClick={this.menuClick.bind(this, item.id)}
                                            innerDivStyle={{padding: '10px 16px 10px 72px'}}
                                            leftIcon={<FontIcon style={styleFontIcon} className={`fa fa-${item.icon}`}/>}
                                            href={`#${item.link}`}
                                        />
                                    ))
                                });

                                return (
                                    <ListItem
                                        key={el.id}
                                        primaryText={el.title}
                                        leftIcon={<FontIcon className={`fa fa-${el.icon}`}/>}
                                        primaryTogglesNestedList={true}
                                        nestedListStyle={{padding:0, backgroundColor:grey100}}
                                        nestedItems={children}
                                    />
                                );
                            } else {
                                return (
                                    <ListItem key={el.id}
                                              style={(this.state.selectListItem == el.id) ? isAllocate : styleListItem}
                                              primaryText={el.title}
                                              onClick={this.menuClick.bind(this, el.id)}
                                              href={`#${el.link}`}
                                              leftIcon={<FontIcon className={`fa fa-${el.icon}`}/>}/>
                                );
                            }
                        },this)
                    }
                </List>
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => ({
    role: state.auth.roles,
    baseUrl: state.baseUrl.baseUrl,
    token: state.auth.token,
    menu: state.menu.menuList
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)