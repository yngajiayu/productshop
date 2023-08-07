import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import storage from "./utils/storage";
import memory from "./utils/memory";

// 取local中保存的user数据，保存在内存中。
memory.user = storage.getUser();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);
