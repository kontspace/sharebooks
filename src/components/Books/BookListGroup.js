import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { Card } from "antd";

import "../../less/bookListGroup.less";

class BookListGroup extends React.Component {
    proxyClick = (bookId, e) => {
        console.log(bookId)
        this.props.onDownloadClick(bookId)
    }

    render() {
        return (
            <Card title={this.props.head} bordered={false} noHovering={true} style={{ width: "100%" }}>
                <div className='book-list'>
                    {this.props.bookMeta.map((item, i) => 
                        <p 
                            className='book-list-item' 
                            key={item._id}>
                            <a 
                                onClick={this.proxyClick.bind(this, item._id)} 
                                download 
                                href={item.download}>{item.title}</a>
                        </p>)}
                </div>
            </Card>
        );
    }
}

BookListGroup.PropTypes = {
    _id: PropTypes.string,
    head: PropTypes.string,
    bookMeta: PropTypes.array,
    onDownloadClick: PropTypes.func
}

export default BookListGroup