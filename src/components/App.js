import React from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

// layout
const App = props =>
    <div id="app">
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["index"]}
                    style={{ lineHeight: "64px" }}
                >
                    <Menu.Item key="index">首页</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <Breadcrumb style={{ margin: "40px 0" }}>
                    {/* <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item> */}
                </Breadcrumb>
                <div
                    style={{ background: "#fff", padding: 24, minHeight: 280 }}
                >
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                {/* Ant Design ©2016 Created by Ant UED */}
            </Footer>
        </Layout>
    </div>;

export default App;
