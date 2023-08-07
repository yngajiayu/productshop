import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ProductHome from "./home";
import ProductAddUpdate from "./add-update";
import ProductDetail from "./detail";

// 商品管理界面
export default class Product extends Component {
  render() {
    return (
      // component字母要小写
      <Switch>
        <Route path="/admin/product/home" component={ProductHome} />
        <Route path="/admin/product/addupdate" component={ProductAddUpdate} />
        <Route path="/admin/product/detail" component={ProductDetail} />
        <Redirect exact to="/admin/product/home" />
      </Switch>
    );
  }
}
