import React, { Component } from "react";
import {
  Card,
  Form,
  message,
  Input,
  Cascader,
  Upload,
  Modal,
  Button,
} from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { reqAddorUpdateProduct, reqCategorys, reqDeleteImg } from "../../api";

import "./detail.css";
import RichTextEditor from "./rich-text-editor";

const Item = Form.Item;
const { TextArea } = Input;

// 商品管理子路由组件
class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);
    //创造保存ref标识的标签对象的容器
    this.editor = React.createRef();
  }
  state = {
    previewOpen: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      /*  {
        uid: "-2",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-3",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-4",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-xxx",
        percent: 50,
        name: "image.png",
        status: "uploading",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
      {
        uid: "-5",
        name: "image.png",
        status: "error",
      }, */
    ],
    /*    options: [
      {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
          {
            value: "hangzhou",
            label: "Hangzhou",
            children: [
              {
                value: "xihu",
                label: "West Lake",
              },
            ],
          },
        ],
      },
    ], */
    options: [],
  };

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  handleCancel = () => this.setState({ previewOpen: false });
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    // setPreviewImage(file.url || file.preview);
    // setPreviewOpen(true);
    // setPreviewTitle(
    //   file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    // );
    this.setState({ previewImage: file.url || file.preview });
    this.setState({ previewOpen: true });
    this.setState({
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  handleChange = ({ file, fileList: newFileList }) => {
    // setFileList(newFileList);
    // 一旦上传成功，将当前上传的file的信息修正
    if (file.status === "done") {
      // file.response返回值格式 /{{status: 0, data: {name: 'xxx.jpg ' , urL: '图片地址'}}
      const result = file.response;
      console.log("res值为：", result);
      if (result.status === 0) {
        message.success("图片上传成功！");
        const { name, url } = result.data;
        file.name = name;
        file.url = url;
        file.status = "done";
      } else {
        message.error("图片上传失败！");
      }
    } else if (file.status === "removed") {
      const result = reqDeleteImg(file.name);
      if (result.status === 0) {
        message.success("删除图片成功！");
      } else {
        message.error("删除图片失败！");
      }
    }
    this.setState({ fileList: newFileList });
  };

  initOptions = async (categorys) => {
    const options = categorys.map((c) => ({
      //注意小括号
      value: c._id,
      label: c.name,
      isLeaf: false,
    }));
    //如果是一个二级分类列表
    const { isUpdate, product } = this.props.location.state;
    const { pcategoryId } = product;
    if (isUpdate && pcategoryId !== "0") {
      //获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pcategoryId);
      //生成二级下拉列表的options
      const childOptions = subCategorys.map((c) => ({
        //注意小括号,生成二级列表
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      //关联到对应的一级option
      //找到对应的一级对象
      const targetOption = options.find(
        (option) => option.value === pcategoryId
      );
      if (targetOption) {
        //如果找到
        targetOption.children = childOptions;
      }
    }
    this.setState({ options });
  };

  loadData = async (selectedOptions) => {
    // 得到选择的option对象
    const targetOption = selectedOptions[0];
    // 显示loading效果
    targetOption.loading = true;
    // 根据选中的分类，请求获取二级分类列表
    const subCategorys = await this.getCategory(targetOption.value);
    if (subCategorys && subCategorys.length > 0) {
      const childOptions = subCategorys.map((c) => ({
        //注意小括号,生成二级列表
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      targetOption.children = childOptions;
    } else {
      // 没有二级分类
      targetOption.isLeaf = true;
    }
    /*  
    if (subCategorys && subCategorys.length > 0) {
      //生成一个二级列表的options
      const childOptions = subCategorys.map((c) => ({
        label: c.name,
        value: c._id,
        isLeaf: true,
      }));
      // 关联到当前option上
      targetOption.children = childOptions;
    } else {
      targetOption.isLeaf = true;
    } */
  };

  //获取一级分类列表
  getCategory = async (parentId) => {
    const result = await reqCategorys(parentId);
    // 请求成功
    if (result.status === 0) {
      if (parentId === "0") {
        this.initOptions(result.data);
      } else {
        return result.data;
      }
    }
  };
  // 添加商品和修改商品的回调
  submit = async (values) => {
    // 1.收集数据，并封装成product对象
    console.log("收集到的数据：", values);
    const { productname, productdesc, price, category, img } = values;
    let pcategoryId, categoryId;
    if (category.length === 1) {
      pcategoryId = "0";
      categoryId = category[0];
    } else {
      pcategoryId = category[0];
      categoryId = category[1];
    }
    const detail = this.editor.current.getDetail();
    const product = {
      productname,
      productdesc,
      price,
      img,
      detail,
      pcategoryId,
      categoryId,
    };
    // 若是更新商品信息
    if (this.isUpdate) {
      product._id = this.product._id;
    }
    // 2．调用接口请求函数去添加/更新
    const res = await reqAddorUpdateProduct(product);

    // 3.根据结果提示
    if (res.status === 1) {
      message.success(`${this.isUpdate ? "修改" : "添加"}商品成功！`);
    } else {
      message.success(`${this.isUpdate ? "修改" : "添加"}商品失败！`);
    }
  };

  componentDidMount() {
    this.getCategory("0");
  }

  componentWillUnmount() {
    // 用于保存是否是更新的标识，如果是添加没值，否则有值。
    // const product = this.props.location.state.product;
    // this.isUpdate = !!product;
    // // 用于保存商品信息
    // this.product = product || {};

    // 用于保存是否是更新的标识，如果是添加没值，否则有值。
    let product;
    try {
      product = this.props.location.state.product || {};
    } catch {
      product = {};
    }
    this.product = product;
    this.isUpdate = !!product;
  }

  render() {
    console.log("fileList:", this.state.fileList);
    // Just show the latest item.
    const displayRender = (labels) => labels[labels.length - 1];
    // form表单布局
    const FormItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };

    // 上传按钮
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div
          style={{
            marginTop: 8,
          }}
        >
          图片上传
        </div>
      </div>
    );

    const title = (
      <>
        <span>
          <ArrowLeftOutlined onClick={() => this.props.history.goBack()} />
        </span>
        <span>{this.isUpdate ? "修改商品" : "添加商品"}</span>
      </>
    );

    const { product } = this.props.location.state;
    return (
      <Card title={title}>
        <Form onFinish={this.submit} {...FormItemLayout}>
          <Item
            label="商品名称"
            name="productname"
            initialValue={product.name}
            // labelCol={{ span: 3 }}
            rules={[
              {
                required: true,
                whitespace: true,
                message: "请输入商品名称!",
              },
            ]}
          >
            <Input placeholder="请输入商品名称" />
          </Item>
          <Item
            label="商品描述"
            name="productdesc"
            initialValue={product.desc}
            rules={[
              {
                required: true,
                whitespace: true,
                message: "请输入商品描述：!",
              },
            ]}
          >
            <TextArea
              placeholder="请输入商品描述："
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>
          <Item
            label="商品价格"
            name="price"
            initialValue={product.price}
            rules={[
              {
                required: true,
                whitespace: true,
                message: "请输入商品价格!",
              },
            ]}
          >
            <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
          </Item>
          <Item
            label="所属分类"
            name="category"
            rules={[
              {
                required: true,
                // whitespace: true,
                message: "请选择商品所属分类!",
              },
            ]}
          >
            <Cascader
              options={this.state.options}
              expandTrigger="hover"
              loadData={this.loadData}
              displayRender={displayRender}
              onChange={this.onChange}
              initialValue={[product.pcategoryId, product.categoryId]}
              placeholder="请选择商品所属分类"
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
            />
          </Item>
          <Item
            label="商品详情"
            name="detail"
            initialValue={product.detail}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 18 }}
          >
            <RichTextEditor ref={this.editor} detail={product.detail} />
          </Item>
          <Item
            label="商品图片"
            name="img"
            // labelCol={{ span: 3 }}
            initialValue={product.imgs}
          >
            <>
              <Upload
                // _上传图片的接口地址
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                /*卡片样式*/
                listType="picture-card"
                // 所有己上传图片文件对象的数组
                fileList={this.state.fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {this.state.fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={this.state.previewOpen}
                title={this.state.previewTitle}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "430px",
                    height: "400px",
                  }}
                  src={this.state.previewImage}
                />
              </Modal>
              <Item>
                <Button type="primary" className="btn" htmlType="submit">
                  提交
                </Button>
              </Item>
            </>
          </Item>
        </Form>
      </Card>
    );
  }
}
export default withRouter(ProductAddUpdate);
