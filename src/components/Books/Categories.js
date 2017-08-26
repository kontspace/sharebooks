import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Menu, Icon, Card } from "antd";
const SubMenu = Menu.SubMenu;


export default class Categories extends React.Component {
    render() {
        return (
            <Card title='分类' bordered={false} noHovering={true} style={{ width: "90%" }}>
            <Menu
                style={{ width: "100%", border: "None" }}
                onClick={this.props.onClick}
                selectedKeys={[
                    this.props.currentKey
                ]}
            >
                <Menu.Item key="all">全部</Menu.Item>
                {this.props.categories.map(name =>
                    <Menu.Item key={name}>
                        {name}
                    </Menu.Item>
                )}
            </Menu>
            </Card>
        );
    }
}

Categories.PropTypes = {
    categories: PropTypes.array,
    onClick: PropTypes.func,
    currentKey: PropTypes.string
};
