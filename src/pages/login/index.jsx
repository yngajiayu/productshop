import React from "react";
import { Form, Input, Button } from "antd";
import "./index.css";
export default function Login() {
  // 事件成功的回调
  const onFinish = (values) => {
    const { username, password } = values;
    try {
      //  登录请求
      // ajaxLogin(username, password);
    } catch (error) {
      console.log("登录失败", error);
    }
  };

  // 事件失败的回调
  const onFinishFailed = (errorInfo) => {
    return console.log("Failed:", errorInfo);
  };

  // 表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("提交表单", e.values);
  };

  return (
    <div className="loginWrap">
      <div className="login">
        <div className="login-head">
          <h1>谷粒商城后台系统</h1>
        </div>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onSubmit={handleSubmit}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, whitespace: true, message: "请输入用户名!" },
                { min: 4, message: "用户名最少4位" },
                {
                  max: 12,
                  message: "用户名最多12位",
                },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message: "用户名必须是英文、数字或下划线组成",
                },
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                { required: true, message: "请输入密码" },
                { min: 4, message: "密码最少4位" },
                {
                  max: 12,
                  message: "密码最多12位",
                },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message: "密码必须是英文、数字或下划线组成",
                },
              ]}
              labelCol={{ span: 4 }}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="btn"
                htmlType="submit"
                onSubmit={handleSubmit}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    </div>
  );
}
