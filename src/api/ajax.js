import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      //1.发送异步请求
      promise = axios.get(url, { params: data });
    } else {
      //发post请求
      promise = axios.post(url, data);
    }
    //2.如果成功,调用resolve
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        message.error("请求出错了:" + error.message);
      });
  });
}
