import React from "react";
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb, Row, Col, Icon } from "antd";
const { Header, Content, Footer } = Layout;

// layout
class App extends React.Component {
    constructor(props) {
        super(props);

        let currentKey = "index";
        // let keyStore = localStorage.getItem("CURRENT_MENU_KEY");
        // if (keyStore) {
        //     currentKey = keyStore;
        // }

        this.state = {
            currentKey: currentKey
        };
    }
    handleClick = e => {
        console.log("click ", e);
        // localStorage.setItem("CURRENT_MENU_KEY", e.key);
        this.setState({
            currentKey: e.key
        });
    };
    render() {
        return (
            <div id="app" style={{ minWidth: 960 }}>
                <Layout className="layout">
                    <Header>
                        <Row>
                            <Col span={4}>
                                <div className="logo">
                                    <h1 style={{ color: "white" }}>
                                        BookStore
                                    </h1>
                                </div>
                            </Col>
                            <Col span={16}>
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    selectedKeys={[
                                        this.state.currentKey
                                    ]}
                                    onClick={this.handleClick}
                                    style={{ lineHeight: "64px" }}
                                >
                                    <Menu.Item key="index">
                                        <a href="/">
                                            <Icon type="laptop" />首页
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item key="onlinedoc">
                                        <a href="http://doc.itzh.org">
                                            <Icon type="cloud-o" />开源书籍
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item key="recommended">
                                        <Icon type="book" />推荐书单
                                    </Menu.Item>
                                    <Menu.Item key="bbs">
                                        <a href="http://bbs.itzh.org">
                                            <Icon type="team" />交流社区
                                        </a>
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
                        <Breadcrumb style={{ margin: "30px 0" }}>
                            {/* <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div
                            style={{
                                background: "#fff",
                                padding: 24,
                                minHeight: 280
                            }}
                        >
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        本站一切内容均来自互联网，如有侵权请联系上传者删除
                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default App;
