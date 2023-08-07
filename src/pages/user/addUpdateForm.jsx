import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;
const Option = Select.Option;

export default class AddUpdateForm extends Component {
  dataRef = React.createRef();
  static propTypes = {
    user: PropTypes.object,
    roles: PropTypes.array.isRequired,
    getFormData: PropTypes.func.isRequired,
  };

  onSubmit = (values) => {
    console.log("收集到的数据是:", values);
    this.props.getFormData(values);
  };

  render() {
    const {
      user: { username, email, phone, role_id, password },
      roles,
    } = this.props;
    console.log("当前传入的user值为:", this.props.user);

    return (
      <Form ref={this.dataRef} onFinish={this.onSubmit}>
        <Item
          label="用户名"
          name="username"
          labelCol={{ span: 4 }}
          initialValues={username ? username : ""}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请输入户名!",
            },
          ]}
        >
          <Input placeholder="请输入用户名" defaultValue={username} />
        </Item>
        <Item
          label="密码"
          name="password"
          labelCol={{ span: 4 }}
          initialValues={password ? password : ""}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input placeholder="请输入密码" defaultValue={password} />
        </Item>
        <Item
          label="手机号"
          name="phone"
          labelCol={{ span: 4 }}
          initialValues={phone ? phone : ""}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请输入手机号!",
            },
          ]}
        >
          <Input
            placeholder="请输入手机号"
            defaultValue={phone}
            //    ref={(input) => this.props.setForm(input)}
          />
        </Item>
        <Item
          label="邮箱"
          name="email"
          labelCol={{ span: 4 }}
          initialValues={email ? email : ""}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请输入邮箱!",
            },
          ]}
        >
          <Input placeholder="请输入邮箱" defaultValue={email} />
        </Item>
        <Item
          label="角色"
          name="role_id"
          labelCol={{ span: 4 }}
          initialValues={role_id ? role_id : ""}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请选择所属角色!",
            },
          ]}
        >
          <Select defaultValue={role_id}>
            {roles.map((role) => (
              <Option value={role._id}>{role.name}</Option>
            ))}
          </Select>
        </Item>
      </Form>
    );
  }
}
