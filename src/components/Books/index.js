import React from "react";
import ReactDOM from "react-dom";

import { Row, Col } from "antd";

import BookCard from "./BookCard";

import "../../less/books.less";

export default class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }
    componentDidMount() {
        fetch("http://book.itzh.org/api/v1/book/get?bookId=-1&pageSize=1000")
            .then(res => res.json())
            .then(res => {
                
                let books = res.result.map(book => {
                    return {
                        _id: book._id,
                        title: book.name,
                        cover: book.bookImgSrc, //book.bookImgSrc,
                        tags: book.tag,
                        desc: book.describe,
                        score: book.score,
                        category: book.category,
                        download: book.downloadLink
                    };
                });
                console.log(books);
                this.setState({books: books})
            });
    }
    render() {
        return (
            <div id="books">
                {this.state.books.map((book, i) =>
                    <BookCard key={book._id} {...book} />
                )}
            </div>
        );
    }
}
