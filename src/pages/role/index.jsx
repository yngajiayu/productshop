import React, { Component } from "react";
import { Card, Button, Table, Modal, Form, Input, message } from "antd";
import { reqRole, reqAddRole, reqUpdateRole } from "../../api";
import formatDate from "../../utils/date";
import AuthForm from "./setTree";
// 角色界面
const Item = Form.Item;

export default class Role extends Component {
  formRef = React.createRef();
  authRef = React.createRef();
  state = {
    roles: [], //所有角色列表
    role: [], // 选中的角色
    showStatus: 0, // 显示状态,0：关闭，1：新增角色模态框打开，2：设置角色权限模态框打开
  };

  onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    this.setState({ selectedRowKeys: newSelectedRowKeys });
  };
  // 获取角色列表
  getRoles = async () => {
    const res = await reqRole();
    if (res.status === 0) {
      this.setState({ roles: res.data });
    }
  };

  onRow = (role) => {
    return {
      onSelect: (event) => {
        this.setState({ role });
      },
      //  注意onClick的C要大写，我粗心写了小写，点击之后然后一直没效果。
      onClick: (event) => {
        this.setState({ role });
      }, // 点击行
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {}, // 鼠标移入行
      onMouseLeave: (event) => {},
    };
  };

  handleOk = () => {
    this.formRef.current.submit();
  };

  onFinish = async (values) => {
    const res = await reqAddRole(values.roleName);
    if (res.status === 0) {
      message.success("添加角色成功！");
      /*  // 重新请求数据，消耗网路资源
       this.getRoles(); */

      /* // 优化，不重新请求数据，减少资源消耗
      const { roles } = this.state;
      const newRoles = [res.data, ...roles];
      this.setState({ roles: newRoles }); */

      // 最优写法,使用setState原始写法，比较适用于要更更新的数据基于原数据。
      this.setState((state) => ({ roles: [...state.roles, res.data] }));
    } else {
      message.error("添加角色失败，请检查后重试~");
    }
    this.setState({ showStatus: 0 });
  };

  updateRole = async () => {
    //隐藏确认框
    this.setState({ showStatus: 0 });
    const { role } = this.state;
    console.log("设置角色权限");
    // 获取当前选中的权限列表
    const menus = this.authRef.current.getRole();
    role.menus = menus;
    const res = await reqUpdateRole(role);
    if (res.status === 0) {
      message.success("角色权限更新成功！");
      this.getRoles();
    } else {
      message.error("角色权限更新失败,请检查后重试！");
    }
  };

  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { showStatus, role, roles } = this.state;
    const columns = [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: (create_time) => formatDate(create_time),
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: (auth_time) => formatDate(auth_time),
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ];
    const rowSelection = {
      type: "radio",
      selectedRowKeys: [role._id],
      onChange: this.onSelectChange,
      onSelect: (role) => this.setState({ role }),
    };
    const title = (
      <>
        <Button type="primary" onClick={() => this.setState({ showStatus: 1 })}>
          创建角色
        </Button>
        <Button
          type="primary"
          disabled={!role._id}
          style={{ marginLeft: 10 }}
          onClick={() => this.setState({ showStatus: 2 })}
        >
          设置角色权限
        </Button>
      </>
    );
    return (
      <Card title={title}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={roles}
          onRow={this.onRow}
          rowKey={(record) => record._id}
          // loading={data.length === 0 ? true : false}，我的智障写法，哈哈哈
          loading={!roles.length}
          // 配置表格可显示的条数
          pagination={{
            defaultPageSize: 5, // 设置每页默认显示的条数
            // showSizeChanger: true, // 显示可改变每页条数的下拉框
            // pageSizeOptions: ["5", "10", "20", "30", "40"], // 指定每页可显示条数的选项
          }}
        />
        <Modal
          title="新增角色"
          open={showStatus === 1}
          okText="确认"
          cancelText="取消"
          // onOk={this.addRole}
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({ showStatus: 0 });
          }}
        >
          <Form ref={this.formRef} onFinish={this.onFinish}>
            <Item
              name="roleName"
              label="角色名"
              rules={[{ required: true, message: "角色名称必须输入!" }]}
            >
              <Input placeholder="请输入角色名称" />
            </Item>
          </Form>
        </Modal>
        <Modal
          title="设置角色权限"
          open={showStatus === 2}
          okText="确认"
          cancelText="取消"
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ showStatus: 0 });
          }}
        >
          <AuthForm ref={this.authRef} role={role} />
        </Modal>
      </Card>
    );
  }
}
