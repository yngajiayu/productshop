import ajax from "./ajax";
import { message } from "antd";
import jsonp from "jsonp";
// 登录模块接口
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

// 添加用户模块接口
export const reqAddUser = (user) => ajax("/manage/user/add", user, "POST");

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) =>
  ajax("/manage/category/list", { parentId });

// 添加分类
export const reqAddCategory = (categoryName, parentId) =>
  ajax("/manage/category/add", { categoryName, parentId }, "POST");
// 更新分类
export const reqUpdateCategory = (categoryName, categoryId) =>
  ajax("/manage/category/update", { categoryName, categoryId }, "POST");

// 获取商品的分类名称
export const reqCategory = (categoryId) =>
  ajax("/manage/category/info", { categoryId });

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) =>
  ajax("/manage/product/list", { pageNum, pageSize });

// 搜索商品分页列表（根据商品名称/商品描述)
// searchType:搜索的类型，productNamey prodyctDesc
export const reqSeachProducts = ({ pageNum, pageSize, seachName, seachType }) =>
  ajax("/manage/product/seach", {
    pageNum,
    pageSize,
    [seachType]: seachName,
  });

// 更新商品的状态
export const reqUpdateStatus = (productId, status) =>
  ajax("/manage/product/updateStatus", { productId, status }, "POST");

//删除商品图片
export const reqDeleteImg = (name) =>
  ajax("/manage/img/delete", { name }, "POST");

/* // 添加商品
export const reqAddProduct = (product) =>
  ajax("manage/product/add", product, "POST");
// 修改商品
export const reqUpdateProduct = (product) =>
  ajax("manage/product/update", product, "POST"); */

// 更优写法,通过判断接口是否有_id去决定请求的是哪个接口。
export const reqAddorUpdateProduct = (product) =>
  ajax("manage/product" + product._id ? "update" : "add", product, "POST");

//获取角色列表
export const reqRole = () => ajax("/manage/role/list");
//添加角色列表
export const reqAddRole = (roleName) =>
  ajax("/manage/role/add", { roleName }, "POST");

//更新角色
export const reqUpdateRole = (role) =>
  ajax("/manage/role/update", role, "POST");

//获取所有用户列表
export const reqUser = () => ajax("/manage/user/list");

//添加用户
export const reqAddUsers = (user) => ajax("/manage/user/add", user, "POST");

//修改用户
export const reqUpdateUsers = (user) =>
  ajax("/manage/user/update", user, "POST");

//删除指定用户
export const reqDelUser = (userId) =>
  ajax("/manage/user/delete", { userId }, "POST");

// json请求接口函数
export const reqWeather = (city) => {
  return new Promise((reslove, reject) => {
    const url = `http://restapi.amap.com/v3/weather/weatherInfo?key=98c97d10c1fda37bdc5402d15c1cdd71&city=${city}`;
    jsonp(url, {}, (err, data) => {
      // 请求成功
      if (!err && data.status === "success") {
        reslove(data);
      } else {
        // console.log("请求错误:", err);
        // 请求失败
        message.error("获取天气信息失败，请检查网络！");
      }
    });
  });
};
