import React from 'react';
import LogIn from './LogIn';
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav className="navbar">
      {props.user ? `Welcome, ${props.user.name}!` : "Welcome, please sign in."}
      {!props.user && <LogIn 
        handleLoginSubmit={props.handleLoginSubmit}
        login={props.login}
        onChangeLogin={props.onChangeLogin}
      />}
      <Link to="/">Home</Link>
      {props.user && <Link to="/create">Create Post</Link>}
      {props.user && <Link to="/" onClick={props.logOut}>Log Out</Link>}
    </nav>
  );
}

export default NavBar;