import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }
  componentDidMount() {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0].name);
        this.setState({ name: data[0].name });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return <div>{this.state.name}</div>;
  }
}

export default User;
