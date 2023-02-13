import React from 'react';
import './../styles/components/Sidebar.scss'
function Sidebar({ children }) {
  return (<div id='sidebar'>
    <div className="sidebar-wrapper">
      <div className="sidebar-header">Header</div>
      <ul className="sidebar-nav">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    {children}
  </div>
  );
}

export default Sidebar;
