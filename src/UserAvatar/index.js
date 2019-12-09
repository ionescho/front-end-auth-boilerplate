import React from 'react';
import './UserAvatar.scss';
import authenticationService from "../_services/authentication.service"

class UserAvatar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.getUserInfo();
  }

  handleLogOut() {
    authenticationService.logout().then(() => {
      window.location.reload();
    });
  }

  getUserInfo() {
    authenticationService.getCurrentUserInfo().then((user) => {
      this.setState({
        user: user
      })
    });
  }

  render() {
    if (this.state.user.name) {
      return (
        <div className="UserAvatar">
          <div className="userImage" >
            <img src={ this.state.user.avatar_url || '/images/User_ProfilePic@2x.png' } />
          </div>
          <div className="userNameOrEmail">
            { this.state.user.name }
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