import React, { Component } from "react";
import { Card, List, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import "./detail.css";
import { reqCategory } from "../../api";
const Item = List.Item;
class ProductDetail extends Component {
  state = {
    cName1: "", //一级分类名称
    cName2: "", //二级分类名称,
  };

  async componentDidMount() {
    const { pcategoryId, categoryId } = this.props.location.state.product;

    if (categoryId === 0) {
      // 一级分类下的商品
      const result = await reqCategory(categoryId);
      this.setState({ cName1: result.data.name || "" });
    } else {
      // 二级分类下的商品
      /*    const result1 = await reqCategory(pcategoryId);
      const result2 = await reqCategory(categoryId);
      const res1Name = result1.data.name || "";
      const res2Name = result2.data.name || ""; 
 */
      // 一次性发送多个请求,只有都成功了，才正常处理,更优写法
      const results = await Promise.all([
        reqCategory(pcategoryId),
        reqCategory(categoryId),
      ]);
      const res1Name = results[0].data.name || "";
      const res2Name = results[1].data.name || "";
      this.setState({
        cName1: res1Name,
        cName2: res2Name,
      });
    }
  }

  render() {
    const { product } = this.props.location.state;
    const title = (
      <>
        <span>
          <ArrowLeftOutlined onClick={() => this.props.history.goBack()} />
        </span>
        <span>商品详情</span>
      </>
    );
    return (
      <Card title={title}>
        <List>
          <Item>
            <p>
              <span className="left">商品名称：</span>
              {product.name}
            </p>
          </Item>
          <Item>
            <p>
              <span className="left">商品描述：</span>
              {product.desc}
            </p>
          </Item>
          <Item>
            <p>
              <span className="left">商品价格：</span>
              {product.price}
            </p>
          </Item>
          <Item>
            <p>
              <span className="left">所属分类：</span>
              {`${this.state.cName1} ->${this.state.cName2}`}
              {/* 电脑 */}
            </p>
          </Item>
          <Item>
            <p style={{ textAlign: "center" }}>
              <span className="left">商品图片：</span>
              <img
                className="listImg"
                src="https://img2.baidu.com/it/u=940015839,2202788747&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690390800&t=ac1ffe9734c6e202aca2521af5c55f9d"
                alt=""
              />
            </p>
          </Item>
          <Item>
            <p>
              <span className="left">商品详情：</span>
              <span
                dangerouslysetInnerHTML={{
                  _html: <p style={{ color: "red" }}>商品详情的内容标题</p>,
                }}
              ></span>
              {product.detail}
            </p>
          </Item>
        </List>
      </Card>
    );
  }
}
export default withRouter(ProductDetail);
