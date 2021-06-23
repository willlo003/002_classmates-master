import React from "react";
import { withRouter } from "react-router-dom";
import auth from "../auth/auth";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      age: "",
      gender: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        // name: this.state.username,
        name: this.state.username,
        email: this.state.email,
        password: this.state.password,
        age: this.state.age,
        gender: this.state.gender,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.hasOwnProperty("email")) {
          alert(data.email);
        } else {
          this.props.toLogin();
          this.setState({
            // username: '',
            username: "",
            email: "",
            password: "",
            age: "",
            gender: "",
          });
          auth.login(() => {
            this.props.history.push("/my_groups");
          });
        }
        // console.log("front", data);
      })
      .catch((err) => console.log("Create User fetch /api/user: ERROR: ", err));

    // this.state.login(user);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input
              type="text"
              value={this.state.age}
              onChange={this.update("age")}
              placeholder="Age (Optional)"
            />
            <br />
            <input
              type="text"
              value={this.state.gender}
              onChange={this.update("gender")}
              placeholder="Gender (Optional)"
            />
            <br />
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
