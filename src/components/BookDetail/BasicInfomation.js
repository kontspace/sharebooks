import React from "react";
import { Row, Col, Tag, Rate } from "antd";

import "../../less/bookDetailBasicInfomation.less";

class BasicInfomation extends React.Component {
    parse_date = dateObj =>
        [dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate()].join(
            "-"
        );

    render() {
        // console.log(this.props);
        return (
            <div className="book-detail">
                <div style={{ width: "100%" }}>
                    <h1>{this.props.name}</h1>
                    <Row type="flex">
                        <Col>
                            <img
                                alt={this.props.name + " cover"}
                                width="135px"
                                height="170px"
                                src={this.props.bookImgSrc}
                            />
                        </Col>
                        <Col className="book-detail-meta">
                            <div >
                                <p className="book-detail-bs">
                                    <b>分类：</b>
                                    <span>{this.props.category}</span>
                                </p>
                                <p className="book-detail-bs">
                                    <b>作者：</b>
                                    <span>{this.props.bookAuthor}</span>
                                </p>
                                <p className="book-detail-bs">
                                    <b>上传者：</b>
                                    <span>{this.props.uploadUser}</span>
                                </p>
                                <p className="book-detail-bs">
                                    <b>下载次数：</b>
                                    <span>{this.props.downloadCount}</span>
                                </p>
                                <p className="book-detail-bs">
                                    <b>更新时间：</b>
                                    <span>
                                        {this.parse_date(
                                            new Date(this.props.updateTime)
                                        )}
                                    </span>
                                </p>
                            </div>
                        </Col>
                        <Col className='book-detail-rate'>
                            <p>我们对这本书的评分：</p>
                            <Rate
                                disabled
                                value={parseFloat(
                                    (this.props.score / 20).toFixed(1)
                                )}
                                allowHalf={true}
                            />
                            <div>
                                <b>分数：</b>
                                {this.props.score ? (
                                    <Tag color="#f50">
                                        {parseInt(this.props.score / 10)}
                                    </Tag>
                                ) : (
                                    ""
                                )}
                            </div>
                        </Col>
                        <Col />
                    </Row>
                    <Row className='book-detail-tags'>
                        <b>标签：</b>

                        {this.props.tag ? (
                            this.props.tag.map(tag => (
                                <Tag key={tag} color="#2db7f5">
                                    {tag}
                                </Tag>
                            ))
                        ) : (
                            ""
                        )}
                    </Row>
                </div>
            </div>
        );
    }
}

export default BasicInfomation;
