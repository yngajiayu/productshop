import React from "react";
import { Layout } from "antd";
import Head from "../../component/header";
import LeftNav from "../../component/left-nav";
import { Route, Switch, Redirect } from "react-router-dom";
import Category from "../category";
import Product from "../product";
import Role from "../role";
import User from "../user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Home from "../home";
import NotFind from "../not-find/index";

const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends React.Component {
  render() {
    return (
      <>
        <Layout style={{ height: "801px" }}>
          <Sider>
            <LeftNav />
          </Sider>
          <Layout>
            <Header style={{ backgroundColor: "#fff" }}>
              <Head />
            </Header>
            <Content style={{ marign: 20, backgroundColor: "white" }}>
              <Switch>
                {/* 访问/时自动跳转到home组件 */}
                <Redirect exact from="/" to="/admin/home" />
                <Route path="/admin/home" component={Home} />
                <Route path="/admin/category" component={Category} />
                <Route path="/admin/product" component={Product} />
                <Route path="/admin/role" component={Role} />
                <Route path="/admin/user" component={User} />
                <Route path="/admin/charts/bar" component={Bar} />
                <Route path="/admin/charts/line" component={Line} />
                <Route path="/admin/charts/pie" component={Pie} />
                {/* 更优写法 */}
                <Route component={NotFind} />
                {/* 都匹配不到时自动跳转到NotFind组件 */}
                {/* <Route to="/admin/notfind" component={NotFind} />
                <Redirect exact to="/admin/notfind" /> */}
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center", marginBottom: -100 }}>
              <h1 style={{ color: "black" }}>欢迎登录商城后台系统</h1>
            </Footer>
          </Layout>
        </Layout>
      </>
    );
  }
}
