import React, { Component } from "react";
import formatDate from "../../utils/date";
import { withRouter } from "react-router-dom";
import { reqWeather } from "../../api/index";
import { Button, Modal } from "antd";
import memory from "../../utils/memory";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./index.css";
import storage from "../../utils/storage";
const { confirm } = Modal;
class Head extends Component {
  state = {
    //当前时间字符串
    currentTime: formatDate(Date.now()),
    //天气图片
    weatherImg: "",
    weatherText: "",
    titleName: "",
  };

  //  退出回调
  logOut = () => {
    confirm({
      title: "确定要退出登录吗?",
      icon: <ExclamationCircleFilled />,
      okText: "确定",
      cancelText: "取消",
      content: "",
      onOk: () => {
        //移除用户登录的信息
        console.log("当前登录用户的信息：", memory.user);
        storage.removeUser();
        memory.user = {};
        this.props.history.push("/login");
      },
    });
  };
  //  获取页面名字
  getTitleName = () => {
    const path = this.props.location.pathname || "/category";
    // console.log("页面路由名", path);
    //注意substring()和lastIndexOf()方法都是小写。
    const name = path.substring(path.lastIndexOf("/") + 1);

    const titleMap = new Map([
      ["home", "首页"],
      ["category", "品类管理"],
      ["product", "商品管理"],
      ["user", "用户管理"],
      ["role", "角色管理"],
      ["bar", "柱状图"],
      ["line", "折线图"],
      ["pie", "饼图"],
    ]);

    this.setState({ titleName: titleMap.get(name) });
    // console.log(this.state.titleName);
  };
  //动态改变显示时间
  getcurrentTme = () => {
    this.timeId = setInterval(() => {
      this.setState({ currentTime: formatDate(Date.now()) });
    }, 1000);
  };
  //获取天气信息
  getWeather = async () => {
    const weather = await reqWeather("上海");
    console.log("天气信息:", weather);

    this.setState({});
  };
  // 第一次render时执行
  componentDidMount() {
    this.getcurrentTme();
    this.getWeather();
    this.getTitleName();
  }
  //  titleName值发生改变时，触发重渲染。
  componentDidUpdate(prevProps, prevState) {
    // console.log(`以前值${prevState.titleName},当前值：${this.state.titleName}`);
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // 在titleName 改变时执行特定的操作
      this.getTitleName();
    }
  }

  // 组件卸载时
  componentWillUnmount() {
    clearInterval(this.timeId);
  }
  render() {
    const { currentTime, weatherImg, weatherText, titleName } = this.state;
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎登录,{memory.user.username}</span>
          <Button className="logOut" onClick={this.logOut}>
            退出
          </Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{titleName}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            {/*          <img
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginTop: 20,
                width: 30,
                height: 20,
              }}
              // src="http://api.map.baidu.com/images/weather/day/qing.png"
              // src={weatherImg}
              alt="weather"
            /> */}
            <span>{weatherText}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Head);
