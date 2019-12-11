import React from 'react';
import './Sidebar.scss';
import UserAvatar from '../UserAvatar';
import authenticationService from "../_services/authentication.service";
import {
  withRouter
} from "react-router-dom";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: authenticationService.isLoggedIn()
    }

    this.props.history.listen((location, action) => {
      this.setState({
        isLoggedIn: authenticationService.isLoggedIn()
      });
    });
  }

  render() {
    return (
      <div className="Sidebar">
        <div className="logo" >
          <img src='/images/IdeaPool_icon.png' />
          <div className="logo_title">
            The Idea Pool
          </div>
        </div>
        {
          this.state.isLoggedIn
          ?
          <UserAvatar />
          :
          ""
        }
      </div>
    );    
  }
}

export default withRouter(Sidebar);