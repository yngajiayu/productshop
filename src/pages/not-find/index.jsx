import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { withRouter } from "react-router-dom";
import "./index.css";

class NotFind extends Component {
  goHome = () => {
    this.props.history.replace("/admin/home");
  };
  render() {
    return (
      <Row gutter={16} className="page">
        <Col span={12}></Col>
        <Col span={12} style={{ marginTop: 150 }}>
          <h2>404,您访问的页面不存在</h2>
          <h2>
            <Button
              type="primary"
              onClick={() => this.goHome()}
              style={{ marginRight: 0 }}
            >
              回到首页
            </Button>
          </h2>
        </Col>
      </Row>
    );
  }
}
export default withRouter(NotFind);
