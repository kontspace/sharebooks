import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Card, Col, Row, Tag, Button, Rate } from "antd";

import "../../less/bookcard.less";

const LIMIT = 50;

class BookCard extends React.Component {
    limit_desc(desc) {
        if (desc.length > LIMIT) {
            let words = desc.split("").slice(0, LIMIT);
            return words.join("") + "......";
        } else {
            return desc;
        }
    }
    render() {
        return (
            <div className="book-card">
                <div className="card-col">
                    <Card bordered={true} bodyStyle={{ padding: 0 }}>
                        <div className="card-image">
                            <img
                                alt="example"
                                width="100%"
                                height="300px"
                                src={this.props.cover}
                            />
                        </div>
                        <div className="card-body">
                            <h2 className="book-title">
                                {this.props.title}
                            </h2>
                            <div className="book-tags">
                                {this.props.tags.map(tag =>
                                    <Tag key={tag} color="#2db7f5">
                                        {tag}
                                    </Tag>
                                )}
                            </div>
                            <div className="book-score">
                                <Rate
                                    disabled
                                    value={this.props.score}
                                    allowHalf={true}
                                />
                                <Tag color="#f50">{this.props.score}</Tag>
                            </div>
                            <div className="book-desc">
                                <p>
                                    {this.limit_desc(this.props.desc)}
                                </p>
                            </div>
                            <Row
                                type="flex"
                                justify="space-between"
                                className="book-others"
                                align="middle"
                            >
                                <Col>
                                    <span>分类：</span>
                                    <Tag color="#87d068">
                                        {this.props.category}
                                    </Tag>
                                </Col>
                                <Col>
                                    <a
                                        target="_blank"
                                        type="primary"
                                        icon="download"
                                        size="default"
                                        href={this.props.download}
                                        download
                                    >
                                        下载
                                    </a>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

BookCard.PropTypes = {
    title: PropTypes.string,
    cover: PropTypes.string,
    tags: PropTypes.array,
    desc: PropTypes.string,
    score: PropTypes.number,
    category: PropTypes.string,
    download: PropTypes.string
};

export default BookCard;
