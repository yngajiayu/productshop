import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { Form, Input, Button, message } from "antd";
import { reqLogin } from "../../api";
// import { Navigate } from "react-router-dom";
import memory from "../../utils/memory";
import { withRouter, Redirect } from "react-router-dom";
import storage from "../../utils/storage";
import "./index.css";

class Login extends Component {
  // 事件成功的回调
  onFinish = (values) => {
    const { username, password } = values;
    try {
      reqLogin(username, password).then((response) => {
        if (response.status === 0) {
          const { history } = this.props;
          // 保存用户信息
          const user = response.data;
          // console.log("登录成功", user);
          memory.user = user;
          console.log("内存中保存的user信息", memory.user);
          storage.saveUser(user);
          // console.log("本地保存的user信息", storage);
          message.success("登录成功！");
          // 登录成功,跳转到管理界面
          history.replace("/admin");
        } else {
          message.error("登录失败，请检查您的用户名和密码后重新登录！");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 事件失败的回调
  onFinishFailed = (errorInfo) => {
    return console.log("Failed:", errorInfo);
  };

  render() {
    const user = memory.user;
    if (user._id) {
      // 内存中没有存储user ==> 当前没有登录
      return <Redirect to="/admin" />;
    }
    return (
      <div className="loginWrap">
        <div className="login">
          <div className="login-head">
            <h1 style={{ fontSize: 40, color: "black" }}>商城系统后台</h1>
          </div>
          <section className="login-content">
            <h2>用户登录</h2>
            <Form
              name="basic"
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入用户名!",
                  },
                  { min: 2, message: "用户名最少2位" },
                  {
                    max: 10,
                    message: "用户名最多10位",
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
                  // {
                  //   max: 12,
                  //   message: "密码最多12位",
                  // },
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
                <Button type="primary" className="btn" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </section>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
