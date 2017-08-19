import React from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb, Row, Col, Icon } from "antd";
const { Header, Content, Footer } = Layout;

// layout
const App = props =>
    <div id="app" style={{minWidth: 960}}>
        <Layout className="layout">
            <Header>
                <Row>
                    <Col span={4}>
                        <div className="logo">
                            <h1 style={{color: 'white'}}>ShareBook</h1>
                        </div>
                    </Col>
                    <Col span={16}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["index"]}
                            style={{ lineHeight: "64px" }}
                        >
                            <Menu.Item key="index">
                                <Icon type="laptop" />首页
                            </Menu.Item>
                            <Menu.Item key="recommended">
                                <Icon type="book" />推荐书单
                            </Menu.Item>
                            <Menu.Item key="contact">
                                <Icon type="user" />联系我们
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4} />
                </Row>
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
