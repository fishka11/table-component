import React from 'react';

export default function Menu() {
  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              <a data-toggle="dropdown" className="dropdown-toggle" href="/">
                <span className="block m-t-xs font-bold">Example user</span>
                <span className="text-muted text-xs block">
                  menu <b className="caret" />
                </span>
              </a>
              <ul className="dropdown-menu animated fadeInRight m-t-xs">
                <li>
                  <a className="dropdown-item" href="login.html">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <div className="logo-element">IN+</div>
          </li>
          <li className="active">
            <a href="index.html">
              <i className="fa fa-th-large" />{' '}
              <span className="nav-label">Main view</span>
            </a>
          </li>
          <li>
            <a href="minor.html">
              <i className="fa fa-th-large" />{' '}
              <span className="nav-label">Minor view</span>{' '}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
