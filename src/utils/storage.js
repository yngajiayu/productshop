// import store from "store";

// 在内存中保存用户信息
const storage = {
  // 保存用户
  saveUser(user) {
    localStorage.setItem("user_key", JSON.stringify(user));
    // store.set("user_key", user);
  },

  // 读取用户
  getUser() {
    return JSON.parse(localStorage.getItem("user_key") || "{}");
    // eslint-disable-next-line no-unused-expressions
    // store.get("user_key") || {};
  },

  // 删除用户
  removeUser() {
    localStorage.removeItem("user_key");
    // store.remove("user_key");
  },
};

export default storage;
