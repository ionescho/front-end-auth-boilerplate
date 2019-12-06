import React from 'react';
import './Sidebar.scss';

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="logo" >
        <img src='/images/IdeaPool_icon.png' />
        <div className="logo_title">
          The Idea Pool
        </div>
      </div>
    </div>
  );
}

export default Sidebar;