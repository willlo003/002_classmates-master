import React, { Component } from "react";
import auth from "../auth/auth";
import Group from "./Group";

class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = { groups: [] };
    // this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    fetch("/api/user/mygroups", { credentials: "include" })
      .then((res) => res.json())
      .then((groups) => {
        this.setState(() => {
          return { groups };
        });
      })
      .catch((err) => "You are not authorized");
  }

  render() {
    const { groups } = this.state;
    // console.log(this.state.groups);
    console.log("this state", this.state.groups);
    return (
      <>
        <h1 className="u-center">Joined Groups</h1>
        <div className="creategroup">
          <button
            className="button_pri"
            onClick={() => {
              this.props.history.push("/group/create");
            }}
          >
            Create group
          </button>
        </div>
        <div className="group_section">
          {groups.map((group, id) => (
            <Group {...group} id={id} key={group._id} />
          ))}
        </div>
      </>
    );
  }
}

export default MyGroups;
