import React from "react";
import { ProfileWithConnect } from "./Profile";
import { HomeWithConnect } from "./Home";
import { Map } from "./Map";
import PropTypes from "prop-types";
import "./App.css";
import { connect, useSelector } from "react-redux";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import iconAppBar from './assets/iconAppBar.svg' ;
import {logOut} from './actions'

const ProtectedPage = ({ component }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  
  return isLoggedIn ? component : <Navigate to='/' />
}

class App extends React.Component {
  unauthenticate = (event) => {
    event.preventDefault();
    localStorage.setItem('email', '');
    localStorage.setItem('password', '');
    this.props.logOut();
  };

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    return (
      <>
        {isLoggedIn ? (
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <img src={iconAppBar} />
                </Typography>
                <Button color="inherit" component={Link} to="/map">Карта</Button>
                <Button color="inherit" component={Link} to="/profile">Профиль</Button>
                <Button color="inherit" onClick={this.unauthenticate}>Выйти</Button>
              </Toolbar>
            </AppBar>
          </Box>
        ) : null}
        <main data-testid="container">
          <section>
            <Routes>
              <Route exact path="/" element={<HomeWithConnect />} />
              <Route path="/map" element={<ProtectedPage component={<Map />} />} />
              <Route path="/profile" element={<ProtectedPage component={<ProfileWithConnect />} />} />
            </Routes>
          </section>
        </main>
      </>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn }),
  { logOut }
)(App);
