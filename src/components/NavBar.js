import React from 'react';
import LogIn from './LogIn';

const NavBar = (props) => {
  return (
    <nav className="navbar">
      {props.user ? `Hello, ${props.user.name}!` : "Hello, please sign in."}
      {!props.user && <LogIn 
        handleLoginSubmit={props.handleLoginSubmit}
        login={props.login}
        onChangeLogin={props.onChangeLogin}
      />}
    </nav>
  );
}

export default NavBar;