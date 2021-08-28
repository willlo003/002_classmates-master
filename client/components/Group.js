import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

class Group extends Component {
  constructor(props) {
    super(props);
    this.join = this.join.bind(this);
    this.quit = this.quit.bind(this);
    this.state = { joined: false };
  }

  UNSAFE_componentWillMount() {
    if (this.props.joinedID.indexOf(this.props._id) !== -1) {
      this.setState({ joined: true });
    } else {
      this.setState({ joined: false });
    }
  }

  // join the gp
  join() {
    fetch("/api/user/joinGroup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        groupID: this.props._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ joined: true });
      });
  }

  // quit the group
  quit() {
    fetch("/api/user/quitGroup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        groupID: this.props._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ joined: false });
        this.props.handleClick(this.props._id);
      });
  }

  render() {
    const { _id, id, subject, courselinks, size } = this.props;
    let ActionButton;
    if (this.props.isLoggedIn) {
      if (!this.state.joined) {
        ActionButton = (
          <button onClick={this.join} className="join_group">
            join
          </button>
        );
      } else {
        ActionButton = (
          <button onClick={this.quit} className="quit_group">
            quit
          </button>
        );
      }
    }
    return (
      <div className="group_section_card">
        <div className="card_img_section">
          <Link
            to={{
              pathname: `/group/${_id}`,
              state: {
                joined: this.state.joined,
              },
            }}
          >
            <img
              src={`https://picsum.photos/id/${_id || id}/300/200`}
              className="card_img"
            />
          </Link>
        </div>
        <div className="card_content">
          <h4>{subject}</h4>
          <h5 className="onespace">Size of classroom: {size}</h5>
          <h5 className="courselink">
            <a href={courselinks}>Check Udemy course &rarr;</a>
          </h5>
          <br></br>
          {ActionButton}
        </div>
      </div>
    );
  }
}

export default Group;
