import React from "react";
import { withRouter } from "react-router-dom";
import auth from "../auth/auth";
import zxcvbn from "zxcvbn";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      age: "",
      gender: "",
      strength: 0,
      strengthClass: "Very Weak",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value,
      });
      if (e.target.type === "password") {
        this.setState({ strength: zxcvbn(e.currentTarget.value).score });
        let strengthClass = zxcvbn(e.currentTarget.value).score;
        if (strengthClass === 0) {
          this.setState({ strengthClass: "Very Weak" });
        } else if (strengthClass === 1) {
          this.setState({ strengthClass: "Weak" });
        } else if (strengthClass === 2) {
          this.setState({ strengthClass: "Fair" });
        } else if (strengthClass === 3) {
          this.setState({ strengthClass: "Good" });
        } else if (strengthClass === 4) {
          this.setState({ strengthClass: "Strong" });
        }
      }
    };
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.strength >= 2) {
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
              username: "",
              email: "",
              password: "",
              age: "",
              gender: "",
              strength: 0,
              strengthClass: "Very Weak",
            });
            auth.login(() => {
              this.props.history.push("/my_groups");
            });
          }
        })
        .catch((err) =>
          console.log("Create User fetch /api/user: ERROR: ", err)
        );
      this.state.login(user);
    } else {
      alert("Password too weak, please change");
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="signup_form">
          <h2>Sign up</h2>
          <div>
            <input
              className="signup"
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
            />
            <br />
            <input
              className="signup"
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
            />
            <br />
            <span className="form-hint">
              To conform with our Strong Password policy, you are required to
              use a sufficiently strong password.
            </span>
            <h4 className="strength-value" data-strength={this.state.strength}>
              {this.state.strengthClass}
            </h4>
            <div className="strength-meter">
              <div
                className="strength-meter-fill"
                data-strength={this.state.strength}
              ></div>
            </div>
            <br />
            <input
              className="signup"
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
            />
            <br />
            <input
              className="signup"
              type="text"
              value={this.state.age}
              onChange={this.update("age")}
              placeholder="Age (Optional)"
            />
            <br />
            <input
              className="signup"
              type="text"
              value={this.state.gender}
              onChange={this.update("gender")}
              placeholder="Gender (Optional)"
            />
            <br />
            <input type="submit" value="Sign up" className="signup_button" />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
