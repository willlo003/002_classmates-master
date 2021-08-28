import React from "react";
import { withRouter } from "react-router-dom";
import auth from "../auth/auth";

class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      categories: "",
      descriptions: "",
      rules: "",
      courselinks: "",
      size: 0,
      sunday: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      group_id: undefined,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderErrors = this.renderErrors.bind(this);
  }

  UNSAFE_componentWillMount() {
    fetch("/api/user/create", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => console.log("successobj", data))
      .catch((err) => {
        console.log("not success");
        this.props.history.push("/login");
      });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    let {
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
    fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      credentials: "include",
      body: JSON.stringify({
        // name: this.state.username,
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
      }),
    })
      .then((resp) => resp.json())
      .then((group) => {
        // console.log("data", data)
        this.setState({
          subject: "",
          categories: "",
          descriptions: "",
          rules: "",
          courselinks: "",
          size: "",
          sunday: "",
          monday: "",
          tuesday: "",
          wednesday: "",
          thursday: "",
          friday: "",
          saturday: "",
          group_id: group._id,
        });
        auth.login(() => {
          this.props.history.push(`/group/${group._id}`);
        });
      })
      .catch((err) =>
        console.log("CreateCharacter fetch /api/user: ERROR: ", err)
      );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Subject</label>
            <input
              type="text"
              value={this.state.subject}
              onChange={this.update("subject")}
              placeholder="Subject"
            />
            <br />
            <label>Category</label>
            <input
              type="text"
              value={this.state.categories}
              onChange={this.update("categories")}
              placeholder="Categories"
            />
            <br />
            <label>Description</label>
            <input
              type="text"
              value={this.state.descriptions}
              onChange={this.update("descriptions")}
              placeholder="Descriptions"
            />
            <br />
            <label>Rules</label>
            <input
              type="text"
              value={this.state.rules}
              onChange={this.update("rules")}
              placeholder="Rules"
            />
            <br />
            <label>Course URL</label>
            <input
              type="text"
              value={this.state.courselinks}
              onChange={this.update("courselinks")}
              placeholder="Courselinks (optional)"
            />
            <br />
            <label>Group Size</label>
            <input
              type="number"
              value={this.state.size}
              onChange={this.update("size")}
              placeholder="Maximimum group size is 4"
            />
            <br />
            <label>Sunday</label>
            <input
              type="text"
              value={this.state.sunday}
              onChange={this.update("sunday")}
              placeholder="00:00-23:59"
            />
            <br />
            <label>Monday</label>
            <input
              type="text"
              value={this.state.monday}
              onChange={this.update("monday")}
              placeholder="00:00-23:59"
            />
            <br />
            <label>Tuesday</label>
            <input
              type="text"
              value={this.state.tuesday}
              onChange={this.update("tuesday")}
              placeholder="00:00-23:59"
            />
            <br />
            <label>Wendesday</label>
            <input
              type="text"
              value={this.state.wednesday}
              onChange={this.update("wednesday")}
              placeholder="00:00-23:59"
            />
            <br />
            <label>Thursday</label>
            <input
              type="text"
              value={this.state.thursday}
              onChange={this.update("thursday")}
              placeholder="00:00-23:59"
            />
            <br />
            <label>Friday</label>
            <input
              type="text"
              value={this.state.friday}
              onChange={this.update("friday")}
              placeholder="00:00-23:59"
            />
            <br />
            <label>Saturday</label>
            <input
              type="text"
              value={this.state.saturday}
              onChange={this.update("saturday")}
              placeholder="00:00-23:59"
            />
            <br />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateGroup);
