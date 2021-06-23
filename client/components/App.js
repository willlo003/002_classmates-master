import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
// import User from './User';
import Groups from "./Groups";
import GroupDetails from "./GroupDetails";
import MyGroups from "./MyGroups";
import CreateGroup from "./CreateGroup";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import ProtectedRoute from "./protectedRoutes/ProtectedRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.toLogin = this.toLogin.bind(this);
  }

  toLogin() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    console.log("is userLoggedIn? ", this.state.isLoggedIn);
    return (
      <div className="container">
        <BrowserRouter>
          <div className="content">
            <div className="nav_user">
              <div className="nav_item">
                <Link to="/">
                  <img
                    src="/assets/logo.png"
                    alt="logo"
                    className="nav_item logo"
                  />
                </Link>
              </div>
              <div className="nav_item nav_item_flex">
                <Link to="/" className="usernav_item nav_active">
                  All groups
                </Link>
                <Link to="my_groups" className="usernav_item">
                  My groups
                </Link>
                <a href="#" className="usernav_item">
                  Profile
                </a>
              </div>
              <div className="nav_item u-right">
                <Link to="/login" className="nav_item">
                  {this.state.isLoggedIn ? "Signout" : "Sign up / Log in"}
                </Link>
              </div>
            </div>

            <Switch>
              <Route exact path="/login">
                <LoginForm toLogin={this.toLogin} />
                <SignupForm toLogin={this.toLogin} />
              </Route>
              <ProtectedRoute exact path="/my_groups" component={MyGroups} />
              <ProtectedRoute
                exact
                path="/group/create"
                component={CreateGroup}
              />
              <Route exact path="/groups" component={Groups} />
              <Route exact path="/" component={Groups} />
              <Route path="/group/:id" component={GroupDetails} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
