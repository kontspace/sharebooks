import React from "react";

import '../../less/bookDetailDescribe.less'

const BookDescribe = props => (
    <div className='book-detail-describe'>
        <h2>内容简介</h2>

        {props.describe ? (
            props.describe.split("\n").map((line, i) => <p key={i}>{line}</p>)
        ) : (
            ""
        )}
    </div>
);

export default BookDescribe;
