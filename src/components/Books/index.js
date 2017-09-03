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
import { withRouter } from "react-router";
import DevTools from "mobx-react-devtools";

import agent from "../../agent";

// components
import BookCard from "./BookCard";
import BookListGroup from "./BookListGroup";
import Categories from "./Categories";
import OptionSearch from "./OptionSearch";

import "../../less/books.less";

const Option = Select.Option;

@inject("bookStore")
@withRouter
@observer
export default class ListBooks extends React.Component {
    handlePaginationChange = (pageNum, pageSize) => {
        let params = this.getSearchFileds();
        this.props.bookStore
            .loadBooks(pageNum, pageSize, params)
            .catch(this.handlerRequestError);
    };
    handlerRequestError = error => {
        message.error(error, 5);
    };
    getSearchFileds = () => {
        let params = {};
        let sr = this.props.bookStore.getSearchRegistry();

        switch (this.props.bookStore.searchRegistryOption) {
            case "title":
                if (sr.title) params.name = sr.title;
                break;
            case "tags":
                if (sr.tags.length > 0) params.tag = sr.tags.join(",");
                break;
        }

        if (sr.category != "all") {
            params.category = sr.category;
        }

        return params;
    };
    collectDownload = bookId => {
        console.log(bookId);
        this.props.bookStore
            .increaseDownloadCount(bookId)
            .catch(this.handlerRequestError);
    };
    handleCategoriesOnClick = e => {
        this.props.bookStore.setSearchRegistry("category", e.key);

        let params = this.getSearchFileds();
        this.props.bookStore
            .loadBooks(1, this.props.bookStore._defaultPageSize, params)
            .catch(this.handlerRequestError);
    };
    handleOptionSearchOnOptionChange = value => {
        this.props.bookStore.setSearchRegistry("option", value);
    };
    handleOptionSearchOnValueChange = e => {
        switch (this.props.bookStore.searchRegistryOption) {
            case "title":
                this.props.bookStore.setSearchRegistry("title", e);
                break;
            case "tags":
                this.props.bookStore.setSearchRegistry("tags", e);
                break;
        }
    };
    handleOptionSearchOnSearch = () => {
        let params = this.getSearchFileds();
        console.log(params)
        this.props.bookStore
            .loadBooks(1, this.props.bookStore._defaultPageSize, params)
            .catch(this.handlerRequestError);
    };
    componentDidMount() {
        this.props.bookStore.loadBooks().catch(this.handlerRequestError);
        this.props.bookStore.loadCategories().catch(this.handlerRequestError);
        this.props.bookStore.loadNewTop().catch(this.handlerRequestError);
        this.props.bookStore.loadTags().catch(this.handlerRequestError);
        this.props.bookStore.loadTopDownload().catch(this.handlerRequestError);
    }
    render() {
        // console.log(this.props)
        return (
            <div id="books">
                <Row>
                    <Col span={5} />
                    <Col span={14}>
                        <OptionSearch
                            tags={this.props.bookStore.tags}
                            option={this.props.bookStore.searchRegistryOption}
                            onValueChange={this.handleOptionSearchOnValueChange}
                            onOptionChange={
                                this.handleOptionSearchOnOptionChange
                            }
                            onSearch={this.handleOptionSearchOnSearch}
                        />
                    </Col>
                    <Col span={5} />
                </Row>

                <Spin spinning={this.props.bookStore.isLoading} tip="加载中......">
                    <Row>
                        <Col span={5}>
                            <Categories
                                currentKey={
                                    this.props.bookStore
                                        .currentKeySearchRegistry
                                }
                                categories={this.props.bookStore.categories}
                                onClick={this.handleCategoriesOnClick}
                            />
                        </Col>
                        <Col span={14}>
                            <div className="cards">
                                {this.props.bookStore.books.length === 0
                                    ? <div className="card-not-found">
                                          没有找到该类书籍......
                                      </div>
                                    : this.props.bookStore.books.map(
                                          (book, i) =>
                                              <BookCard
                                                  key={book._id}
                                                  onDownloadClick={
                                                      this.collectDownload
                                                  }
                                                  {...book}
                                              />
                                      )}
                            </div>
                        </Col>
                        <Col span={5}>
                            <BookListGroup
                                head={"最近更新"}
                                onDownloadClick={this.collectDownload}
                                bookMeta={this.props.bookStore.newTop}
                            />
                            <BookListGroup
                                head={"下载最多"}
                                onDownloadClick={this.collectDownload}
                                bookMeta={this.props.bookStore.top10Download}
                            />
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
                {/*<DevTools />*/}
            </div>
        );
    }
}
