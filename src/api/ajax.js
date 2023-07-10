import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      //1.发送异步请求
      promise = axios.get(url, { params: data });
    } else {
      axios.post(url, data);
    }
    //2.如果成功了，调用resolve(value)
    promise
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        message.error("请求出错了：" + error.message);
      });
  });
}
