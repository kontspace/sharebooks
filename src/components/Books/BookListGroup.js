import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { Card } from "antd";

import "../../less/bookListGroup.less";

class BookListGroup extends React.Component {
    // changeRoute = (bookId, e) => {
    //     e.preventDefault();
    //     hashHistory.push('/#/books/' + bookId);
    // }

    render() {
        return (
            <Card
                title={this.props.head}
                bordered={false}
                noHovering={true}
                style={{ width: "100%" }}
            >
                <div className="book-list">
                    {this.props.bookMeta.map((item, i) => (
                        <Link key={item._id} to={{pathname: '/books/' + item._id}}>
                            <p className="book-list-item">
                                {item.title}
                            </p>
                        </Link>
                    ))}
                </div>
            </Card>
        );
    }
}

BookListGroup.PropTypes = {
    _id: PropTypes.string,
    head: PropTypes.string,
    bookMeta: PropTypes.array
    // onDownloadClick: PropTypes.func
};

export default BookListGroup;
