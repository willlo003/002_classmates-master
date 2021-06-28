import React, { Component } from "react";
import Group from "./Group";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = { groups: [], joinedID: [] };
    // this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    fetch("/api/group")
      .then((res) => res.json())
      .then((groups) => {
        // console.log(groups)
        this.setState(() => {
          return { groups };
        });
      });

    fetch("/api/user/mygroups", { credentials: "include" })
      .then((res) => res.json())
      .then((groups) => {
        let joinedID = [];
        groups.forEach((gp) => {
          joinedID.push(gp._id);
        });
        // console.log(joinedID);
        this.setState(() => {
          return { joinedID };
        });
      });
  }

  render() {
    const { groups, joinedID } = this.state;
    // console.log(groups, joinedID);
    return (
      <>
        <img src="/assets/1.jpeg" alt="banner" className="banner" />
        <h2 className="tagline">
          Meet your <span className="lightondark">buddy</span> now
        </h2>
        <h1 className="u-center">Available Groups</h1>
        <div className="group_section">
          {/* <button onClick={() => { this.props.history.push("/login") } } >Login</button> */}
          {groups.map((group) => (
            <Group
              {...group}
              key={group._id}
              joinedID={joinedID}
              isLoggedIn={this.props.isLoggedIn}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Groups;
