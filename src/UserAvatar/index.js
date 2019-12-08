import React from 'react';
import './UserAvatar.scss';
import authenticationService from "../_services/authentication.service"

class UserAvatar extends React.Component {

  constructor(props) {
    super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    authenticationService.logout();
    window.location.reload();
  }

  render() {
    let userCredentials = authenticationService.getUserCredentials();
    if (userCredentials) {
      return (
        <div className="UserAvatar">
          <div className="userImage" >
            <img src='/images/User_ProfilePic@2x.png' />
          </div>
          <div className="userNameOrEmail">
            { userCredentials.name || userCredentials.email }
          </div>
          <div className="logOutLink">
            <a onClick={this.handleLogOut}>Log out</a>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
}

export default UserAvatar;