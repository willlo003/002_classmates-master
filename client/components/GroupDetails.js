import React, { Component } from "react";

class GroupDetails extends Component {
  constructor(props) {
    super(props);
    this.join = this.join.bind(this);
    this.quit = this.quit.bind(this);
    this.state = { joined: this.props.location.state.joined };
  }
  UNSAFE_componentWillMount() {
    const {
      match: { params },
    } = this.props;
    fetch(`/api/group/${params.id}`)
      .then((res) => res.json())
      .then((group) => {
        console.log("GroupDetails: ", group);
        this.setState(() => {
          return { ...group };
        });
      });
  }

  join() {
    fetch("/api/user/joinGroup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        groupID: this.state._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ joined: true });
      });
  }

  quit() {
    fetch("/api/user/quitGroup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        groupID: this.state._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ joined: false });
      });
  }

  render() {
    let ActionButton;
    if (this.state.joined !== true) {
      ActionButton = (
        <button className="button_sec" onClick={this.join}>
          Join Group
        </button>
      );
    } else {
      ActionButton = (
        <button className="button_sec" onClick={this.quit}>
          Quit Group
        </button>
      );
    }

    const {
      subject,
      categories,
      descriptions,
      rules,
      courselinks,
      size,
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    } = this.state;
    return (
      <>
        <div className="quitgroup">{ActionButton}</div>
        <h1>{subject}</h1>
        <div className="detail">
          <div className="picture_section">
            <div className="picture_card">
              <img src="/assets/3.jpeg" className="card_img" />
            </div>
            <h3>Host: Catcat</h3>
            <h5 className="onespace">
              {Math.floor(Math.random() * 4)} space left
            </h5>
          </div>
          <div className="groupdetail_section">
            <div className="groupdetail">
              <h3 className="detail_title">Description</h3>
              <p>{descriptions}</p>
            </div>
            <div className="groupdetail">
              <h5 className="detail_subtitle">Rules</h5>
              <p>{rules}</p>
            </div>
            <div className="groupdetail">
              <h5 className="detail_subtitle">Available time</h5>
              <p>Monday {monday}</p>
              <p>Tuesday {tuesday}</p>
              <p>Wednesday {wednesday}</p>
              <p>Thursday {thursday}</p>
              <p>Friday {friday}</p>
              <p>Saturday {saturday}</p>
              <p>Sunday {sunday}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GroupDetails;
