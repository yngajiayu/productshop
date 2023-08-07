import React, { Component } from "react";
import "./index.css";
export default class LinkButton extends Component {
  render() {
    return <button {...this.props} className="link-button"></button>;
  }
}
