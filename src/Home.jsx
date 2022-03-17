import React, { Component } from "react";
import {PropTypes} from 'prop-types'
import { withAuth } from "./AuthContext";

export class Home extends Component {
  state = { isNewUser: false };

  goToProfile = (event) => {
    event.preventDefault();
    this.props.navigate("profile");
  };

  showSignUp = () => {
    this.setState({ isNewUser: true });
  };

  authenticate = (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    this.props.logIn(email.value, password.value);
  };

  render() {
    const isNewUser = this.state.isNewUser;
    return (
      <>
        {this.props.isLoggedIn ? (
          <p>
            You are logged in{" "}
            <button onClick={this.goToProfile}>
              go to profile
            </button>
          </p>
        ) : (
          <>
            {!isNewUser ? (
              <form onSubmit={this.authenticate}>
                <span>
                  Are you new here?&nbsp;
                  <a id="signUpButton" onClick={this.showSignUp}>
                    Sign up
                  </a>
                </span>
                <br></br><br></br>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" name="email" size="28" />
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" name="password" size="28" />
                <button type="submit">Log in</button>
              </form>
            ) : (
              <form onSubmit={this.authenticate}>
                <label htmlFor="username">Name:</label>
                <input id="username" />
                <br></br>
                <label htmlFor="userphone">Phone:</label>
                <input id="userphone" />
                <br></br>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" name="email" size="28" />
                <br></br>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" name="password" size="28" />
                <button type="submit">Save</button>
              </form>
            )}
          </>
        )}
      </>
    );
  }
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  logIn: PropTypes.func,
  navigate: PropTypes.func,
};

export const HomeWithAuth = withAuth(Home);
