import React from "react";
import { Icon } from "antd";

import "../../less/bookDetailDownload.less";

export default class BookDownload extends React.Component {
    proxyClick = (bookId, e) => {
        console.log(bookId);
        this.props.onDownloadClick(this.props.bookId);
    };

    render() {
        return (
            <div className="book-detail-download">
                <h2>下载</h2>
                <a
                    href={this.props.downloadLink}
                    onClick={this.proxyClick}
                    download
                >
                    <Icon type="file-pdf" /> PDF 下载
                </a>
            </div>
        );
    }
}
