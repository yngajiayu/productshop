import React, { Component } from "react";
import {
  Button,
  Card,
  // Icon
  Table,
  Space,
  message,
  Modal,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { reqUser, reqDelUser, reqAddUsers, reqUpdateUsers } from "../../api";
import AddUpdateForm from "./addUpdateForm";
import formatDate from "../../utils/date";
const { confirm } = Modal;

// 用户管理界面
export default class User extends Component {
  formRef = React.createRef();
  state = {
    users: [], // 所有用户列表
    roles: [], // 用户角色列表
    showStatus: 0, // 0，添加/修改用户的模态框都不显示，1.添加用户的模态框显示 2.修改用户的模态框显示。
  };

  // 发ajax请求
  getUser = async () => {
    const result = await reqUser();
    // 请求成功
    if (result.status === 0) {
      this.initRoleNames(result.data.roles);
      this.setState({ users: result.data.users, roles: result.data.roles });
    } else {
      message.error("获取用户列表失败！");
    }
  };
  //获取表单收集到的数据
  getFormData = (values) => {
    this.formData = values;
    console.log("父组件收集到的数据：", values);
  };

  // 添加用户信息
  addUser = () => {
    this.setState({ showStatus: 0 });
    this.formRef.current.dataRef.current.submit();
    setTimeout(async () => {
      // 发请求更新分类
      if (this.formData) {
        const formData = this.formData;
        //新增create_time属性
        formData.create_time = Date.now();
        const result = await reqAddUsers(formData);
        // 添加成功后清除已收集到的数据
        this.formData = null;
        // console.log(result);
        if (result.status === 0) {
          //重新显示列表
          this.getUser(); //重新获取用户列表
          message.success("添加成功");
        } else {
          message.error("添加失败");
        }
      }
    }, 0);
  };

  // 修改用户信息
  updateUser = async () => {
    // 关闭模态框
    this.setState({ showStatus: 0 });
    //  触发Form的表单提交
    this.formRef.current.dataRef.current.submit();
    console.log("收集的数据：", this.formData);
    setTimeout(async () => {
      // 发请求更新分类
      if (this.formData) {
        const formData = this.formData;
        //新增create_time属性
        formData.create_time = Date.now();
        const result = await reqUpdateUsers(formData);
        // 添加成功后清除已收集到的数据
        this.formData = null;
        // console.log(result);
        if (result.status === 0) {
          //重新显示列表
          this.getUser(); //重新获取用户列表
          message.success("修改成功");
        } else {
          message.error("修改失败");
        }
      }
    }, 0);
  };

  // 根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
  initRoleNames = (role) => {
    const roleNames = role.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    this.roleNames = roleNames;
  };

  //点击修改按钮的回调函数
  showUpdateUser = (user) => {
    console.log("点击传入的user值为：", user);
    this.user = user;
    this.setState({ showStatus: 2 });
    console.log("现在保存的user值为：", this.user);
  };

  // 删除的回调函数
  deleteUser = async (user) => {
    confirm({
      title: `确定删除${user.username}吗?`,
      icon: <ExclamationCircleFilled />,
      okText: "确定",
      cancelText: "取消",
      content: "",
      onOk: async () => {
        const result = await reqDelUser(user._id);
        // 请求成功
        if (result.status === 0) {
          message.success("删除用户成功！");
          this.getUser();
        } else {
          message.error("获取用户列表失败！");
        }
      },
    });
  };

  componentDidMount() {
    //获取用户列表数据
    this.getUser();

    //
  }
  //初始化table所有列的数据
  initColumn = () => {
    return [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      {
        title: "电话",
        dataIndex: "phone",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        render: (time) => formatDate(time),
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        // render: (id) => this.state.roles.find((role) => role._id === id).name,
        render: (id) => this.roleNames[id],
      },

      {
        title: "操作",
        key: "action",
        width: "20%",
        render: (user) => (
          <Space size="middle">
            <Button type="primary" onClick={() => this.showUpdateUser(user)}>
              修改
            </Button>
            <Button type="primary" onClick={() => this.deleteUser(user)}>
              删除
            </Button>
          </Space>
        ),
      },
    ];
  };
  render() {
    const { users, showStatus, roles } = this.state;
    const title = (
      <Button
        type="primary"
        onClick={() => {
          this.setState({ showStatus: 1 });
        }}
      >
        添加用户
      </Button>
    );

    return (
      <Card title={title}>
        <Modal
          title="新增用户"
          open={showStatus === 1}
          okText="确认"
          cancelText="取消"
          // onOk={this.addCategory}
          onOk={this.addUser}
          onCancel={() => {
            this.setState({ showStatus: 0 });
          }}
        >
          <AddUpdateForm
            roles={roles}
            ref={this.formRef}
            user={{}}
            getFormData={this.getFormData}
          />
        </Modal>
        <Modal
          title="修改用户"
          open={showStatus === 2}
          okText="确认"
          cancelText="取消"
          onOk={this.updateUser}
          onCancel={() => {
            this.setState({ showStatus: 0 });
          }}
        >
          <AddUpdateForm
            roles={roles}
            ref={this.formRef}
            user={this.user}
            getFormData={this.getFormData}
          />
        </Modal>
        <Table
          dataSource={users}
          columns={this.initColumn()}
          rowKey="username"
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          //没数据时展示loading状态
          loading={!users.length}
          bordered
        ></Table>
      </Card>
    );
  }
}
