import React from 'react';

const LogIn = (props) => {
  return (
    <nav className="navbar">
      <form onSubmit={props.handleLoginSubmit}>
        <label>Email:</label>
        <input
          name="email"
          type="text"
          required
          value={props.login.email}
          onChange={props.onChangeLogin}
        />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          required
          value={props.login.password}
          onChange={props.onChangeLogin}
        />
        <button>Submit</button>
      </form>
    </nav>
  );
}

export default LogIn;