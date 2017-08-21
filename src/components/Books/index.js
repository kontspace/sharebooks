import React from "react";
import ReactDOM from "react-dom";
import {
    Row,
    Col,
    Pagination,
    message,
    Spin,
    Select,
    Button,
    Icon
} from "antd";
import { inject, observer } from "mobx-react";
import agent from "../../agent";

// components
import BookCard from "./BookCard";
import {BookListGroup, ListOption}  from "./BookListGroup";

import "../../less/books.less";

const Option = Select.Option;

@inject("bookStore")
@observer
export default class ListBooks extends React.Component {
    handlePaginationChange = (pageNum, pageSize) => {
        this.props.bookStore
            .loadBooks(pageNum, pageSize)
            .catch(this.handlerRequestError);
    };
    handlerRequestError = error => {
        message.error(error, 5);
    };
    listBooks = url => {
        return fetch(url).then(res => res.json());
    };
    componentDidMount() {
        this.props.bookStore.loadBooks().catch(this.handlerRequestError);
        this.props.bookStore.loadCategories().catch(this.handlerRequestError);
        this.props.bookStore.loadNewTop().catch(this.handlerRequestError);
    }
    render() {
        return (
            <div id="books">
                <Row>
                    <Col span={4} />
                    <Col span={16}>
                        <Row className="books-search" gutter={16}>
                            <Col span={4}>
                                <Select
                                    showSearch
                                    placeholder="选择分类"
                                    style={{ width: "100%" }}
                                >
                                    <Option value="all">全部</Option>
                                    {this.props.bookStore.categories.map(c =>
                                        <Option key={c} value={c}>
                                            {c}
                                        </Option>
                                    )}
                                </Select>
                            </Col>
                            <Col span={16}>
                                <Select
                                    showSearch
                                    placeholder="选择标签"
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                >
                                    {this.props.bookStore.categories.map(c =>
                                        <Option key={c} value={c}>
                                            {c}
                                        </Option>
                                    )}
                                </Select>
                            </Col>
                            <Col span={2}>
                                <Button type="primary" icon="search">
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4} />
                </Row>

                <Spin spinning={this.props.bookStore.isLoading} tip="加载中......">
                    <Row>
                        <Col span={5} />
                        <Col span={14}>
                            <div className="cards">
                                {this.props.bookStore.books.map((book, i) =>
                                    <BookCard key={book._id} {...book} />
                                )}
                            </div>
                        </Col>
                        <Col span={5}>
                            <BookListGroup>
                                {this.props.bookStore.newTop.map((book, i) => <ListOption key={i}><a href={book.download}>{i+1}、{book.title}</a></ListOption>)}
                            </BookListGroup>
                        </Col>
                    </Row>
                </Spin>
                {this.props.bookStore.isLoading
                    ? ""
                    : <Pagination
                          className="pagination"
                          total={this.props.bookStore.total}
                          onChange={this.handlePaginationChange}
                          defaultPageSize={this.props.bookStore.defaultPageSize}
                          current={this.props.bookStore.currentPage}
                      />}
            </div>
        );
    }
}
