import React from "react";
import { ProfileWithAuth } from "./Profile";
import { HomeWithAuth } from "./Home";
import { Map } from "./Map";
import { withAuth } from "./AuthContext";
import PropTypes from 'prop-types';
import "./App.css";

const PAGES = {
  home: (props) => <HomeWithAuth {...props} />,
  map: (props) => <Map {...props} />,
  profile: (props) => <ProfileWithAuth {...props} />,
};

class App extends React.Component {
  state = { currentPage: "home" };

  navigateTo = (page) => {
    if (this.props.isLoggedIn) {
      this.setState({ currentPage: page });
    } else {
      this.setState({ currentPage: "home" });
    }
  };

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <>
        {isLoggedIn ? (
        <header>
          <nav>
            <ul>
              <li>
                <button
                  onClick={() => {
                    this.navigateTo("home");
                  }}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    this.navigateTo("map");
                  }}
                >
                  Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    this.navigateTo("profile");
                  }}
                >
                  Profile
                </button>
              </li>
            </ul>
          </nav>
        </header>
        ) : null}
        <main data-testid="container">
          <section>
            {PAGES[this.state.currentPage]({ navigate: this.navigateTo })}
          </section>
        </main>
      </>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default withAuth(App);