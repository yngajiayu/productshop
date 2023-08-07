import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

// 柱状图界面
export default class Bar extends Component {
  render() {
    const option = {
      title: {
        text: "柱状图",
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    };
    return (
      <ReactEcharts option={option} style={{ width: "100%", height: "100%" }} />
    );
  }
}
