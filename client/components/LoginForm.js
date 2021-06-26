import React from "react";
import { withRouter } from "react-router-dom";
import auth from "../auth/auth";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify({
        name: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.hasOwnProperty("message")) {
          alert(data.message);
        } else {
          this.props.toLogin();
          this.setState({
            email: "",
            password: "",
          });
          this.props.history.push("/my_groups");

          auth.login(() => {
            this.props.history.push("/my_groups");
          });
        }
      })
      .catch((err) =>
        console.log("CreateCharacter fetch /api/user: ERROR: ", err)
      );

    // this.state.login(user);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
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
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
