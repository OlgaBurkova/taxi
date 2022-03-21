import React, { Component } from "react";
import {logIn} from './actions'
import {connect} from 'react-redux'

export class Profile extends Component {
  render() {
    return (
      <p>
        Информация о профиле
      </p>
    );
  }
}

export const ProfileWithConnect = connect(
  null,
  { logIn }
)(Profile);
