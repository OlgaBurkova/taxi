import React from "react";
import { Profile } from "./Profile";
import { Map } from "./Map";
import "./App.css";

const PAGES = {
  map: <Map />,
  profile: <Profile />
};

class App extends React.Component {
  state = { currentPage: "map", isLoggedIn: false };

  navigateTo = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    console.log(isLoggedIn);
    return (
      <>
        {isLoggedIn ? (
          <>
            <header>
              <nav>
                <ul>
                  <li>
                    <a
                      onClick={() => {
                        this.navigateTo("map");
                      }}
                    >
                      Карта
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.navigateTo("profile");
                      }}
                    >
                      Профиль
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        this.setState({ isLoggedIn: false });
                      }}
                    >
                      Выйти
                    </a>
                  </li>
                </ul>
              </nav>
            </header>
            <main data-testid="container">
              <section>{PAGES[this.state.currentPage]}</section>
            </main>
          </>
        ) : (
          <form>
            <span>Новый пользователь? Зарегистрируйтесь</span>
            <br></br><br></br>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" name="email" size="28" />
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" size="28" />
            <br></br><br></br>
            <button
              onClick={() => {
                this.setState({ isLoggedIn: true });
                this.navigateTo("map");
              }}
            >
              Войти
            </button>
          </form>
        )}
      </>
    );
  }
}

export default App;
