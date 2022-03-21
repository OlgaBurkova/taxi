import React, { Component } from "react";
import { authenticate } from "./actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import icon from './assets/icon.svg' ;
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

export class Home extends Component {
  state = { isNewUser: false };

  showSignUp = () => {
    this.setState({ isNewUser: true });
  };

  hideSignUp = () => {
    this.setState({ isNewUser: false });
  };

  authenticate = (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
    this.props.authenticate(email.value, password.value);
  };

  render() {
    const isNewUser = this.state.isNewUser;
    return (
      <>
        {this.props.isLoggedIn ? (
          <Navigate to='/profile' />
        ) : (
          <>
            {!isNewUser ? (
              <Box sx={{ height: '100vh' }}>
                <Grid container sx={{ height: '100vh' }} alignItems="center">
                  <Grid item xs={6}>
                    <img id="iconStartPage" src={icon} />
                  </Grid>
                  <Grid item xs={6}>
                    <form onSubmit={this.authenticate}>
                      <h1>Войти</h1>
                      <span>
                        Новый пользователь?&nbsp;
                        <a id="signUpButton" onClick={this.showSignUp}>
                          Зарегистрируйтесь
                        </a>
                      </span>
                      <br></br><br></br>
                      <Input id="outlined-basic" type="email" name="email" placeholder="Адрес электронной почты" />
                      <Input id="outlined-basic" type="password" name="password" placeholder="Пароль" />
                      <br></br><br></br>
                      <Button type="submit" variant="contained">Войти</Button>
                    </form>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Box sx={{ height: '100vh' }}>
                <Grid container sx={{ height: '100vh' }} alignItems="center">
                  <Grid item xs={6}>
                    <img id="iconStartPage" src={icon} />
                  </Grid>
                  <Grid item xs={6}>
                    <form onSubmit={this.authenticate}>
                      <h1>Регистрация</h1>
                      <span>
                        Уже зарегистрированы?&nbsp;
                        <a id="signUpButton" onClick={this.hideSignUp}>
                          Войти
                        </a>
                      </span>
                      <br></br><br></br>
                      <Input id="outlined-basic" type="email" name="email" placeholder="Адрес электронной почты" />
                      <Input id="outlined-basic" type="name" name="name" placeholder="Имя" />
                      <Input id="outlined-basic" type="surname" name="surname" placeholder="Фамилия" />
                      <Input id="outlined-basic" type="password" name="password" placeholder="Пароль" />
                      <br></br><br></br>
                      <Button type="submit" variant="contained">Войти</Button>
                    </form>
                  </Grid>
                </Grid>
              </Box>
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
};

export const HomeWithConnect = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn }),
  { authenticate }
)(Home);
