import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;
export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  };

  render() {
    const { categoryName } = this.props;
    return (
      <Form>
        <Item
          label="分类名称"
          name="categoryName"
          labelCol={{ span: 4 }}
          initialValues={categoryName ? categoryName : ""}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请输入分类名称!",
            },
          ]}
        >
          <Input
            placeholder="请输入分类名称"
            defaultValue={categoryName}
            ref={(input) => this.props.setForm(input)}
          ></Input>
        </Item>
      </Form>
    );
  }
}
