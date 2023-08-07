/* import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";
const Item = Form.Item;
const Option = Select.Option;
export default class AddForm extends Component {
  static propTypes = {
    categorys: PropTypes.array.isRequired, // 一级分类数组
    parentId: PropTypes.array.isRequired, // 父分类的id
    setInput: PropTypes.func.isRequired, // 获取输入的内容
    setClasses: PropTypes.func.isRequired, // 获取当前的parentId
  };

  render() {
    const { categorys } = this.props;
    return (
      <Form>
        <Item
          label="所属分类"
          name="category"
          initialValues="category"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "请选择分类!",
            },
          ]}
        >
          <Select
            defaultValue="0"
            ref={(input) => this.props.setClasses(input)}
          >
            <Option value="0">一级分类</Option>

            {categorys.map((item) => (
              <Option value={item._id}>{item.name}</Option>
            ))}
          </Select>
        </Item>

        <Item
          label="分类名"
          name="categoryName"
          labelCol={{ span: 4 }}
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
            ref={(input) => this.props.setInput(input)}
            setInput
          ></Input>
        </Item>
      </Form>
    );
  }
}
 */


import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;
const Option = Select.Option;
export default class AddForm extends Component {
  static propTypes = {
    categorys: PropTypes.array.isRequired,
    setClasses: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
  };
  render() {
    const { categorys } = this.props;
    return (
      <Form onValuesChange={this.onFinish}>
        <Item initialValue="0" name="classer">
          <Select ref={(input) => this.props.setClasses(input)}>
            <Option key="0">一级分类</Option>
            {categorys.map((c) => (
              <Option value={c._id} key={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          name="username"
          rules={[{ required: true, message: "名称必须输入!" }]}
        >
          <Input
            placeholder="请输入分类名称"
            ref={(input) => this.props.setInput(input)}
          ></Input>
        </Item>
        {/* <Item></Item><Input></Input>
                <Input></Input> */}
      </Form>
    );
  }
}
