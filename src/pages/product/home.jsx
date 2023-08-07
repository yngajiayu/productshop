import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
import LinkButton from "../../component/link-button";
import { reqProducts, reqSeachProducts, reqUpdateStatus } from "../../api";
// 商品管理主界面
const Option = Select.Option;
export default class ProductHome extends Component {
  state = {
    total: 0, // 商品总数量
    // products: [], //商品数组
    loding: false, // loding显示效果
    seachName: "", // 搜索关键字
    seachType: "productName", // 根据哪个字段进行搜索
    products: [
      {
        status: 1,
        imgs: ["image-1554636776678.jpg", "image-1557738385383.jpg"],
        _id: "5ca9e05db49ef916541160cd",
        name: "联想ThinkPad翼48o",
        desc: "年度重量级新品,x390、T490全新登场更加轻薄机身设计",
        price: 6600,
        pcategoryId: "5ca9d6c0b49ef916541160bb",
        categoryId: "5ca9db78b49ef916541160ca",
        detail: "详情",
      },
    ],
  };
  initColumn = () => {
    return [
      {
        title: "商品名称",
        dataIndex: "name",
        align: "center",
        // width: "70%",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
        align: "center",
        // width: "70%",
      },
      {
        title: "价格",
        dataIndex: "price",
        align: "center",
        render: (price) => {
          return `￥ ${price}`;
        },
        // width: "70%",
      },
      {
        title: "状态",
        // dataIndex: "status",
        align: "center",
        render: (product) => {
          const { status, _id } = product;
          return (
            <>
              <Button
                type="primary"
                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
                style={{ marginRight: 15 }}
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <span>{status === 1 ? "在售" : "已下架"}</span>
            </>
          );
        },
      },

      {
        title: "操作",
        key: "action",
        align: "center",
        render: (product) => {
          return (
            <span>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/admin/product/detail", { product })
                }
              >
                详情
              </LinkButton>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/admin/product/addupdate", {
                    product,
                  })
                }
              >
                修改
              </LinkButton>
            </span>
          );
        },
      },
    ];
  };

  //  获取商品信息
  async getProducts(pageNum) {
    // 保存pageNum，让其它方法可以看到
    this.pageNum = pageNum;
    const { seachName, seachType } = this.state;
    let result;
    if (seachName) {
      result = await reqSeachProducts(pageNum, 3, seachName, seachType);
    } else {
      result = await reqProducts(pageNum, 3);
    }
    if (result.status === 0) {
      //取出分页数据，更新状态，显示分页列表
      const { total, list } = result.data;
      this.setState({
        total,
        products: list,
      });
    }
  }

  // 更新商品信息
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      message.success("商品状态更新成功！");
      this.getProducts(this.pageNum);
    } else {
      message.error("更新失败,请检查后重试！");
    }
  };

  componentDidMount() {
    // this.getProducts();
  }
  render() {
    const { products, total, seachName, seachType } = this.state;

    const title = (
      <>
        <Select
          defaultValue="productName"
          style={{ width: 130 }}
          value={seachType}
          onChange={(value) => this.setState({ seachType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: 100, marginLeft: 10 }}
          value={seachName}
          onChange={(e) => this.setState({ seachName: e.target.value })}
        />
        <Button
          type="primary"
          style={{ marginLeft: 20 }}
          onClick={() => this.getProducts(1)}
        >
          搜索
        </Button>
      </>
    );

    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/admin/product/addupdate")}
      >
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.initColumn()}
          loading={products.length === 0 ? true : false}
          pagination={{
            total,
            defaultPageSize: 3,
            onChange: this.getProducts,
          }}
        ></Table>
      </Card>
    );
  }
}
