import React from "react";
import ReactDOM from "react-dom";

import { Row, Col, Pagination } from "antd";

import BookCard from "./BookCard";

import "../../less/books.less";

export default class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            pagination: {
                defaultPageSize: 20,
                total: 1,
                onChange: this.handlePaginationChange
            }
        };
    }
    handlePaginationChange = (page, pageSize) =>{
        this.listBooks(`http://book.itzh.org/api/v1/book/get?bookId=-1&pageSize=${pageSize}&pageNum=${page}`)
            .then(this.handleListBooks)
    }
    handleListBooks = res => {
        let pagination = Object.assign({}, this.state.pagination);
        pagination.total = res.total;

        let books = res.result.map(book => {
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
    listBooks = url => {
        return fetch(url).then(res => res.json());
    };
    componentDidMount() {
        let pageSize = this.state.pagination.defaultPageSize;
        this.listBooks(
            `http://book.itzh.org/api/v1/book/get?bookId=-1&pageSize=${pageSize}`
        ).then(this.handleListBooks);
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
