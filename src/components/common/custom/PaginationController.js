import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import React, { Component } from "react";

import PropTypes from "prop-types";

export default class PaginationController extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    isFirst: PropTypes.bool.isRequired,
    isLast: PropTypes.bool.isRequired,
    gotoPage: PropTypes.func.isRequired
  };

  getPaginationLinks() {
    var links = new Array(this.props.totalPages).fill(0).map((zero, index) => (
      <PaginationItem active={this.props.currentPage == index + 1} key={index}>
        <PaginationLink onClick={() => this.props.gotoPage(index)}>
          {index + 1}
        </PaginationLink>
      </PaginationItem>
    ));
    return links;
  }

  gotoPrevious() {
    this.props.gotoPage(this.props.currentPage - 2);
  }

  gotoNext() {
    this.props.gotoPage(this.props.currentPage);
  }

  render() {
    return (
      <Pagination>
        <PaginationItem disabled={this.props.isFirst}>
          <PaginationLink previous onClick={() => this.gotoPrevious()}>
            Previous
          </PaginationLink>
        </PaginationItem>
        {this.getPaginationLinks()}
        <PaginationItem disabled={this.props.isLast}>
          <PaginationLink next onClick={() => this.gotoNext()}>
            Next
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}
