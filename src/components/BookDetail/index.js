import React from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { message, Row, Col } from "antd";

import BasicInfomation from "./BasicInfomation";
import BookDescribe from "./BookDescribe";
import BookDownload from "./BookDownload";

import BookListGroup from "../Books/BookListGroup";
import Categories from "../Books/Categories";

@inject("bookDetailStore", "bookStore")
@withRouter
@observer
export default class BookDetail extends React.Component {
    handlerRequestError = error => {
        message.error(error, 5);
    };
    collectDownload = bookId => {
        this.props.bookStore
            .increaseDownloadCount(bookId)
            .catch(this.handlerRequestError);
    };
    componentWillReceiveProps(nextProps) {
        let bookId = nextProps.params.id;
        this.props.bookDetailStore
            .loadBook(bookId)
            .catch(this.handlerRequestError);
    }
    componentDidMount() {
        let bookId = this.props.params.id;
        this.props.bookDetailStore
            .loadBook(bookId)
            .catch(this.handlerRequestError);
        this.props.bookStore.loadNewTop().catch(this.handlerRequestError);
        this.props.bookStore.loadTopDownload().catch(this.handlerRequestError);
    }
    render() {
        console.log(this.props.bookDetailStore.currentBook)
        let currentBook = this.props.bookDetailStore.currentBook;
        return (
            <Row>
                <Col span={19}>
                    <BasicInfomation {...currentBook} />
                    <BookDescribe describe={currentBook.describe} />
                    <BookDownload
                        bookId={currentBook._id}
                        onDownloadClick={this.collectDownload}
                        downloadLink={currentBook.downloadLink}
                    />
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
        );
    }
}
