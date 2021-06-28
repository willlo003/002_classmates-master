import React, { Component } from "react";
import auth from "../auth/auth";
import Group from "./Group";

class MyGroups extends Component {
  constructor(props) {
    super(props);
    this.state = { groups: [], joinedID: [] };
    // this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    fetch("/api/user/mygroups", { credentials: "include" })
      .then((res) => res.json())
      .then((groups) => {
        let joinedID = [];
        groups.forEach((gp) => {
          joinedID.push(gp._id);
        });
        // console.log(groups);
        this.setState(() => {
          return { groups, joinedID };
        });
      })
      .catch((err) => "You are not authorized");
  }

  render() {
    const { groups, joinedID } = this.state;
    return (
      <>
        <h1 className="u-center">Joined Groups</h1>
        <div className="creategroup">
          <button
            className="button_pri"
            onClick={() => {
              this.props.history.push("/create");
            }}
          >
            Create group
          </button>
        </div>
        <div className="group_section">
          {groups.map((group) => (
            <Group {...group} key={group._id} joinedID={joinedID} />
          ))}
        </div>
      </>
    );
  }
}

export default MyGroups;
