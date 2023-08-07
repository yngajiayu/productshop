import React, { Component } from "react";
import { Card, Statistic, Timeline, Row, Col, Divider } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import Line from "../charts/line";
import Bar from "../charts/bar";
import "./index.css";
export default class Home extends Component {
  state = {
    isVisited: true,
  };
  handleChange = (isVisited) => {
    return () => this.setState({ isVisited });
  };
  render() {
    return (
      <>
        <Row gutter={16}>
          <Col span={4} offset={2}>
            <Card
              className="home-card"
              title="商品总量"
              headStyle={{ color: "rgba(0,0,0,.45)" }}
            >
              <Statistic
                value={1128163}
                suffix="个"
                style={{ fontWeight: "bolder" }}
              />
              <Statistic
                title="周同比"
                value={15}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
              <Statistic
                title="日同比"
                value={10}
                precision={2}
                valueStyle={{
                  color: "red",
                }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={15} offset={2}>
            <Line />
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={12} offset={2}>
            <Bar />
          </Col>
          <Col span={8} offset={2}>
            <Card title="任务" className="home-table-right">
              <Timeline>
                <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                <Timeline.Item color="red">
                  <p>联调接口</p>
                  <p>功能验收</p>
                </Timeline.Item>
                <Timeline.Item>
                  <p>登录功能设计</p>
                  <p>权限验证</p>
                  <p>页面排版</p>
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
