import React from "react";
import "./../styles/components/Sidebar.scss";
import logo from "../assests/logo.png";

function Sidebar({ children }) {
  return (
    <div id="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-contents">
          <div className="sidebar-header">
            <img className="sidebar-logo" src={logo} />

            <ul className="sidebar-nav">
              <li>
                <a href="#">Hall Management</a>
              </li>
              <li>
                <a href="#">Class Management</a>
              </li>
              <li>
                <a href="#">Department Management</a>
              </li>
            </ul>
          </div>
          <div className="sidebar-user">
            <p className="sidebar-user-name">Admin</p>
            <p className="sidebar-user-name">Logout </p>
          </div>
        </div>
      </div>
      <div className="sidebar-children">{children}</div>
    </div>
  );
}

export default Sidebar;
