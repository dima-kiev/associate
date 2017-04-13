import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions';
import {
    Button,
    ButtonGroup,
    DropdownButton,
    MenuItem,
    Pagination
} from 'react-bootstrap';
import {Link, RouteHandler} from "react-router";
import UltimatePagination from 'react-ultimate-pagination-material-ui';

export class Paginator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boundaryPagesRange: 1,
            siblingPagesRange: 1,
            hidePreviousAndNextPageLinks: true,
            hideFirstAndLastPageLinks: true,
            hideEllipsis: false
        }
    }

    getPage(page) {
        page = page - 1;
        if (!!this.props.parentFunction) {
            this.props.parentFunction(page);
        } else {
            let token   = this.props.token;
            let baseUrl = this.props.baseUrl;
            this.props.actions[this.props.method](token, baseUrl, page);
        }
    }

    render() {
        return (
            (!!this.props.page && this.props.page.totalPages > 1) ?
                <div className="pagination-wrapper text-center marginTop-20">
                    <UltimatePagination
                        currentPage={parseInt(this.props.page.number) + 1}
                        totalPages={parseInt(this.props.page.totalPages)}
                        onChange={this.getPage.bind(this)}
                        boundaryPagesRange={this.state.boundaryPagesRange}
                        siblingPagesRange={this.state.siblingPagesRange}
                        hidePreviousAndNextPageLinks={this.state.hidePreviousAndNextPageLinks}
                        hideFirstAndLastPageLinks={this.state.hideFirstAndLastPageLinks}
                        hideEllipsis={this.state.hideEllipsis}
                    />
                </div>
                : null
        );
    }
}



const mapStateToProps = (state, ownProps) => ({

    baseUrl: state.baseUrl.baseUrl,
    token:  state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)