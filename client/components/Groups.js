import React, { Component } from "react";
import Group from "./Group";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = { groups: [], joinedID: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  UNSAFE_componentWillMount() {
    if (this.props.isLoggedIn === false) {
      fetch("/api/group")
        .then((res) => res.json())
        .then((groups) => {
          // console.log(groups)
          this.setState(() => {
            return { groups };
          });
        });
    } else {
      Promise.all([
        fetch("/api/user/mygroups").then((res) => res.json()),
        fetch("/api/group").then((res) => res.json()),
      ]).then(([joined, groups]) => {
        let joinedID = [];
        joined.forEach((gp) => joinedID.push(gp._id));
        this.setState({
          groups,
          joinedID,
        });
      });
    }
  }

  handleClick(id) {
    let newJoinedID = this.state.joinedID.filter((_id) => _id !== id);
    this.setState({ joinedID: newJoinedID });
  }

  render() {
    const { groups, joinedID } = this.state;
    return (
      <>
        <img src="/assets/1.jpeg" alt="banner" className="banner" />
        <h2 className="tagline">
          Meet your <span className="lightondark">buddy</span> now
        </h2>
        <h1 className="u-center">Available Groups</h1>
        <div className="group_section">
          {groups.map((group) => (
            <Group
              {...group}
              key={group._id}
              joinedID={joinedID}
              isLoggedIn={this.props.isLoggedIn}
              handleClick={this.handleClick}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Groups;
