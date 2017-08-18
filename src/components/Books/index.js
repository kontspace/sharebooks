import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Pagination, message } from "antd";
import agent from '../../agent'
import BookCard from "./BookCard";

import "../../less/books.less";

export default class ListBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            pagination: {
                total: 1,
                onChange: this.handlePaginationChange
            }
        };
    }
    handlePaginationChange = (pageNum, pageSize) => {
        agent.Books.list(pageNum, pageSize)
            .then(this.handleListBooks)
            .catch(this.handlerRequestError)
    };
    handleListBooks = res => {
        let result = res.data.result;
        let pagination = Object.assign({}, this.state.pagination);
        pagination.total = res.data.total;

        let books = result.map(book => {
            return {
                _id: book._id,
                title: book.name,
                cover: book.bookImgSrc, //book.bookImgSrc,
                tags: book.tag,
                desc: book.describe,
                score: parseFloat((book.score / 20).toFixed(1)), // 100 -> 5
                category: book.category,
                download: book.downloadLink
            };
        });
        this.setState({ books: books, pagination: pagination });
    };
    handlerRequestError = error => {
        message.error(error, 5);
    };
    listBooks = url => {
        return fetch(url).then(res => res.json());
    };
    componentDidMount() {
        agent.Books.list(1, 5)
            .then(this.handleListBooks)
            .catch(this.handlerRequestError)
    }
    render() {
        return (
            <div id="books">
                <div className="cards">
                    {this.state.books.map((book, i) =>
                        <BookCard key={book._id} {...book} />
                    )}
                </div>
                <Pagination className="pagination" {...this.state.pagination} />
            </div>
        );
    }
}
