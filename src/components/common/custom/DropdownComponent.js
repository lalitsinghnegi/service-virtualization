import React, { Component } from "react";

export default class DropdownComponent extends Component {
  render() {
    return (
      <select className={this.props.class}
      width={this.props.width}
      onChange = {e => {
        e.preventDefault();
        this.props.selectInput(e.target.value);
      }}>
        {this.props.items.map((item) => <option key={item.value} value={item.value}>{item.display}</option>)}
      </select>
    );
  }
}
