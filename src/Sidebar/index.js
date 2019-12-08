import React from 'react';
import './Sidebar.scss';
import UserAvatar from '../UserAvatar'
import authenticationService from "../_services/authentication.service"

function Sidebar() {
  let isLogged = authenticationService.isLoggedIn();
  return (
    <div className="Sidebar">
      <div className="logo" >
        <img src='/images/IdeaPool_icon.png' />
        <div className="logo_title">
          The Idea Pool
        </div>
      </div>
      {
        isLogged
        ?
        <UserAvatar>
        </UserAvatar>
        :
        ""
      }
    </div>
  );
}

export default Sidebar;