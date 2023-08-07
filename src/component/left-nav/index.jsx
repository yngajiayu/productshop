import React, { Component } from "react";
import "./index.css";
import logo from "../../assets/image/logo.png";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../config/menuConfig";
import memory from "../../utils/memory";

const { SubMenu } = Menu;
class LeftNav extends Component {
  getMenuNodes_map = (menuList) => {
    // map加递归
    return menuList.map((item) => {
      /* 
      title
      key
      icon
      chilren 可能有 */
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };
  //查看item是否有授权
  hasAuth = (item) => {
    const key = item.key;
    const menus = memory.user.role.menus;
    // 展示全部
    // const menus = ["/home", "/user", "/products", "/role", "/charts"];
    const username = memory.user.username;

    /*
    1.如果当前用户是admin,直接通过 
    2.如果当前item是公开的
    3.当前用户有此item的权限
     */
    if (username === "admin" || key === "./home" || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      //4.有一个子item的权限,
      return !!item.children.find((child) => menus.indexOf(child.key) !== -1);
    }
    return false;
  };
  //改用reduce调用
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;
    return menuList.reduce((pre, item) => {
      //查看当前用户是否有item对应的权限
      if (this.hasAuth(item)) {
        //像pre中添加《item》或者《submenu》
        if (!item.children) {
          // 判断item是否是当前对应item
          if (item.key === path || path.indexOf(item.key) === 0) {
            //更新redux中的状态
            // this.props.setHeadTitle(item.title);
          }
          pre.push(
            <Menu.Item key={item.key} icon={item.icon}>
              <Link
                to={`/admin${item.key}`}
                // onClick={() => this.props.setHeadTitle(item.title)}
              >
                {item.title}
              </Link>
            </Menu.Item>
          );
        } else {
          const cItem = item.children.find(
            (cItem) => 0 === path.indexOf(cItem.key)
          );
          //如果存在，说明当前item的子列表需要打开
          if (cItem) {
            this.openkey = item.key;
          }

          pre.push(
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
      return pre; //记住return pre
    }, []);
  };

  //在第一次render之前执行一次，为第一次render准备数据（必须同步）
  UNSAFE_componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    //获取当前页面的pathname。获取到的是/admin/home等形式
    const path = this.props.location.pathname || "/category";
    // const path = "/category";
    return (
      <div className="leftNav" style={{ backgroundColor: "#002140" }}>
        <header className="left_head">
          <img src={logo} alt="logo" />
          <h1>商城系统后台</h1>
        </header>
        <Menu
          mode="inline"
          //对得到的字符通过path.substring(path.lastIndexOf("/") + 1)进行截取，得到home。
          defaultSelectedKeys={[path.substring(path.lastIndexOf("/") + 1)]}
          theme="dark"
          style={{
            width: "100%",
            height: "80%",
            // color: "white",
            fontSize: "20px",
            // backgroundColor: "#002140",
          }}
        >
          {this.menuNodes}
          {/* <Menu.Item key="home" title="首页">
            <Link to="/admin/home">首页</Link>
          </Menu.Item>
          <Menu.SubMenu key="2" title="商品">
            <Menu.Item key="category">
              <Link to="/admin/category">品类管理</Link>
            </Menu.Item>
            <Menu.Item key="product">
              <Link to="/admin/product">商品管理</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="user" title="用户管理">
            <Link to="/admin/user">用户管理</Link>
          </Menu.Item>
          <Menu.Item key="role" title="角色管理">
            <Link to="/admin/role">角色管理</Link>
          </Menu.Item>
          <Menu.SubMenu key="5" title="图形图表">
            <Menu.Item key="bar">
              <Link to="/admin/charts/bar">柱状图</Link>
            </Menu.Item>
            <Menu.Item key="line">
              <Link to="/admin/charts/line">折线图</Link>
            </Menu.Item>
            <Menu.Item key="pie">
              <Link to="/admin/charts/pie">饼图</Link>
            </Menu.Item>
          </Menu.SubMenu> */}
        </Menu>
      </div>
    );
  }
}
export default withRouter(LeftNav);
