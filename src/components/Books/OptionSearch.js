import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { Row, Col, Select, Input, Button, Icon } from "antd";


export default class OptionSearch extends React.Component {
    proxyCommonOnChange = (e) => this.props.onValueChange(e.target.value)


    _renderTitleSearch = () => {
        return <Input onChange={this.proxyCommonOnChange} placeholder="搜索书名" />;
    };

    _renderTagsSearch = () => {
        return (
            <Select
                allowClear
                onChange={this.props.onValueChange}
                placeholder="选择热门标签"
                mode="multiple"
                style={{ width: "100%" }}
            >
                {this.props.tags.map(c =>
                    <Select.Option
                        key={c}
                        value={c}
                        
                    >
                        {c}
                    </Select.Option>
                )}
            </Select>
        );
    };
    render() {
        // console.log(this.props);
        return (
            <Row className="option-search" gutter={16}>
                <Col span={4}>
                    <Select
                        showSearch
                        placeholder="选择搜索类型"
                        defaultValue="title"
                        onChange={this.props.onOptionChange}
                        style={{ width: "100%" }}
                    >
                        <Select.Option value="title">书名</Select.Option>
                        <Select.Option value="tags">标签</Select.Option>
                    </Select>
                </Col>
                <Col span={16}>
                    {this.props.option === "title"
                        ? this._renderTitleSearch()
                        : this._renderTagsSearch()}
                </Col>
                <Col span={2}>
                    <Button type="primary" icon="search" onClick={this.props.onSearch}>
                        Search
                    </Button>
                </Col>
            </Row>
        );
    }
}

// OptionSearch.PropTypes = {
//     tags: PropTypes.array,
//     option: PropTypes.string,
//     onChange: PropTypes.func
// }

// export default OptionSearch;
