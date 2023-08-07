import React, { Component } from "react";
import { Form, Tree, Input } from "antd";
import propTypes from "prop-types";
const Item = Form.Item;
export default class AuthForm extends Component {
  static propTypes = {
    role: propTypes.object,
  };

  constructor(props) {
    super(props);
    const {
      role: { menus },
    } = this.props;
    // 根据传入角色传入
    this.state = {
      checkedKeys: menus,
    };
  }

  state = {
    checkedKeys: [],
  };

  // 根据新传入的roLe来更新checkedKeys状态,当组件接收到新的属性时，自动调用。
  UNSAFE_componentWillReceiveProps(nextPropsL) {
    this.setState({ checkedKeys: nextPropsL.role.menus });
  }

  getRole = () => this.state.checkedKeys;

  onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
    this.setState({ checkedKeys });
  };
  render() {
    const {
      role: { name },
    } = this.props;

    const treeData = [
      {
        title: "平台权限",
        key: "0-0",
        children: [
          {
            title: "首页",
            key: "/home",
          },

          {
            title: "商品",
            key: "/products",

            children: [
              {
                title: "品类管理",
                key: "/category",
              },
              {
                title: "商品管理",
                key: "/product",
              },
            ],
          },
          {
            title: "用户管理",
            key: "/user",
          },
          {
            title: "角色管理",
            key: "/role",
          },
          {
            title: "图形图表",
            key: "/charts",

            children: [
              {
                title: "柱状图",
                key: "/charts/bar",
              },
              {
                title: "折线图",
                key: "/charts/line",
              },
              {
                title: "饼图",
                key: "/charts/pie",
              },
            ],
          },
        ],
      },
    ];
    return (
      <>
        <Item label="角色名称">
          <Input value={name} disabled />
        </Item>
        <Tree
          checkable // 是否可选
          // defaultExpandedKeys={["0-0-0", "0-0-1"]}
          // defaultSelectedKeys={["0-0-0", "0-0-1"]}
          // defaultCheckedKeys={["0-0-0", "0-0-1"]}
          // checkedKeys={menus} // 被选中的节点
          checkedKeys={this.state.checkedKeys} // 被选中的节点
          defaultExpandAll={true} // 是否默认全展开
          onSelect={this.onSelect} // 选中回调
          onCheck={this.onCheck}
          treeData={treeData} // 节点数据
        />
      </>
    );
  }
}
