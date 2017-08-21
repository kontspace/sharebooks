import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "../../less/bookListGroup.less";

export class ListOption extends React.Component {
    render() {
        return (
            <li className="book-list-item">
                {this.props.children}
            </li>
        );
    }
}

export class BookListGroup extends React.Component {
    constructor(props) {
        super(props);
        this.ListOption = ListOption;
    }

    render() {
        return (
            <div className="book-list-group">
                <h3 className="book-list-head">最近新书：</h3>
                <ul className="book-list">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}
