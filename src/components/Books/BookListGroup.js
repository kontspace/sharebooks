import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { Card } from "antd";

import "../../less/bookListGroup.less";

export default class BookListGroup extends React.Component {
    render() {
        return (
            <Card title={this.props.head} bordered={false} noHovering={true} style={{ width: "100%" }}>
                <div className='book-list'>
                    {this.props.bookMeta.map((item, i) => <p className='book-list-item' key={i}><a download href={item.download}>{item.title}</a></p>)}
                </div>
            </Card>
        );
    }
}

BookListGroup.PropTypes = {
    head: PropTypes.string,
    bookMeta: PropTypes.array
}