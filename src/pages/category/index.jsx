import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  Button,
  Card,
  // Icon
  Table,
  Space,
  message,
  Modal,
} from "antd";
import { reqCategorys, reqAddCategory, reqUpdateCategory } from "../../api";
import AddForm from "./add-form";
import UpdateForm from "./updateForm";
// 商品分类界面
class Category extends Component {
  state = {
    categorys: [], // 一级分类列表
    subCategory: [], //二级分类列表
    parentId: "0", //当前需要显示的分类列表的父分类ID
    parentName: "", // 当前需要显示的分类列表的父分类名称
    showStatus: 0, // 0，添加/修改分类的模态框都不显示，1.添加分类的模态框显示 2.修改分类的模态框显示。
    categoryName: "", // 分类名称
  };

  // 查看二级分类列表
  showSubcategorys = async (category) => {
    // console.log("category信息", category);
    // 更新状态
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        //在状态更新且重新render()后执行
        this.getCategory();
      }
    );
  };
  // 发ajax请求,parentId:如果没有指定根据状态中的parentId请求，如果指定了根据指定的请对
  getCategory = async (parentId) => {
    parentId = parentId || this.state.parentId;
    const result = await reqCategorys(parentId);
    // 请求成功
    if (result.status === 0) {
      result.data.forEach((item) => {
        if (item.parentId === "0") {
          // 更新一级分类状态
          this.setState({ categorys: result.data });
        } else {
          // 更新二级分类状态
          this.setState({ subCategory: result.data });
        }
      });
    } else {
      message.error("获取分类列表失败！");
    }
  };
  // 标准版
  addCategotry = async () => {
    this.setState({ showStatus: 0 });
    //发请求更新分类
    // console.log(this.classes);
    // console.log(this.input);
    console.log("新增分类：", this);
    // const parentId = this.classes.props.value;
    const parentId = 1;
    // console.log(categoryId)
    // const categoryName = this.input.props.value;
    const categoryName = "厨具";

    // console.log("*****", this.classes.props, this.input.props);
    if (!categoryName) {
      message.error("名称不能为空!");
      return;
    }
    const result = await reqAddCategory(categoryName, parentId);
    // console.log(result);
    if (result.status === 0) {
      //重新显示列表
      if (!parentId) {
        this.getCategorys(); //重新获取当前分类列表
        message.success("添加成功");
      }
    } else {
      message.error("添加失败");
    }
  };
  /* 
  // 添加商品分类
  addCategory = async () => {
    // 关闭确认框
    this.setState({ showStatus: 0 });
    // 准备请求数据
    const parentId = this.classes.props.value;
    // const categoryName = this.input.props.value;
    console.log(1111, this.classes.props);
    console.log(2222, this.input.props);

    // const result = await reqAddCategory(categoryName, parentId);
    const result = {};
    if (result.status === 0) {
      message.success("添加分类成功！");
      //添加的分类就是当前分类列表下的分类
      if (parentId === this.state.parentId) {
        // 3.重新请求最新的分类列表
        this.getCategory();
      } else if (parentId === "0") {
        this.getCategory("0");
      }
    } else {
      message.success("分添加分类失败,请检查后重新添加！");
    }
  }; */

  // 修改商品分类
  updateCategory = async () => {
    const categoryId = this.classes._id;
    const categoryName = this.form.input.value;
    if (!categoryName) {
      message.error("名称不能为空!");
      return;
    }
    // 1.隐藏状态框
    this.setState({ showStatus: 0 });
    // 2.发送修改分类的请求
    const result = await reqUpdateCategory(categoryName, categoryId);
    console.log("请求结果：", result);
    if (result.status === 0) {
      message.success("分类名称修改成功！");
      // 3.重新请求最新的分类列表
      this.getCategory();
    } else {
      message.success("分类名称修改失败,请检查后重新修改！");
    }
  };
  //点击修改分类按钮的回调函数
  showUpdateCategory = (category) => {
    this.category = category;
    this.setState({ showStatus: 2, categoryName: category.name });
  };

  componentDidMount() {
    //获取分类列表数据
    this.getCategory();

    //
  }
  //初始化table所有列的数据
  initColumn = () => {
    return [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "_id",
        width: "70%",
      },
      {
        title: "操作",
        key: "action",
        render: (category) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => this.showUpdateCategory(category)}
            >
              修改分类
            </Button>

            {/* <Link> */}
            {this.state.parentId === "0" ? (
              <Button
                type="primary"
                onClick={() => this.showSubcategorys(category)}
              >
                查看子分类
                {/* {record} */}
              </Button>
            ) : null}
            {/* </Link> */}
          </Space>
        ),
      },
    ];
  };
  render() {
    const { categorys, parentId, parentName, showStatus, categoryName } =
      this.state;
    // console.log("列表", categorys);
    // const ttile = "一级商品分类列表";
    const ttile =
      parentId === "0" ? (
        "一级商品分类列表"
      ) : (
        <span>
          <span
            onClick={() => {
              this.setState({
                parentId: "0",
                parentName: "",
                subCategorys: [],
              });
            }}
          >
            一级商品分类列表
          </span>
          <span> {parentName}</span>
        </span>
      );
    const extra = (
      <Button
        type="primary"
        onClick={() => {
          this.setState({ showStatus: 1 });
        }}
      >
        {/* <Icon type="puls"></Icon> */}
        添加
      </Button>
    );

    return (
      <Card title={ttile} extra={extra}>
        <Modal
          title="添加商品分类"
          open={showStatus === 1 ? true : false}
          okText="确认"
          cancelText="取消"
          // onOk={this.addCategory}
          onOk={this.addCategotry}
          onCancel={() => {
            this.setState({ showStatus: 0 });
          }}
        >
          <AddForm
            // categorys={categorys}
            parentId={parentId}
            // setInput={(input) => (this.input = input)}
            // setClasses={(classes) => {
            //   this.classes = classes;
            // }}
            categorys={categorys}
            categoryName
            setClasses={(classes) => {
              this.classes = classes;
            }}
            setInput={(input) => {
              this.input = input;
            }}
          />
        </Modal>
        <Modal
          title="修改商品分类"
          open={showStatus === 2 ? true : false}
          okText="确认"
          cancelText="取消"
          onOk={this.updateCategory}
          onCancel={() => {
            console.log("修改商品失败！");
            this.setState({ showStatus: 0 });
          }}
        >
          <UpdateForm
            categoryName={categoryName}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
        <Table
          dataSource={categorys}
          columns={this.initColumn()}
          rowKey="_id"
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          //没数据时展示loading状态
          // loading={categorys.length === 0 ? true : false}
          bordered
        ></Table>
      </Card>
    );
  }
}
export default withRouter(Category);
