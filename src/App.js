import Axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState({ email: "", password: "" });

  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    const currentToken = localStorage.getItem('token');
    if (currentUser) setUser(JSON.parse(currentUser));
    if (currentToken) setToken(currentToken);
  }, [])

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await Axios.post('http://localhost:3005/api/users/login', login);
      const currentUser = data.data.user;
      const currentToken = data.data.token;
      setUser(currentUser);
      setToken(currentToken);
      localStorage.setItem('user', JSON.stringify(currentUser));
      localStorage.setItem('token', currentToken);
    } catch(err) {
      console.log(err);
    }
  }

  const onChangeLogin = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="App">
      <NavBar 
        login={login}
        user={user}
        token={token}
        handleLoginSubmit={handleLoginSubmit}
        onChangeLogin={onChangeLogin}
      />
    </div>
  );
}

export default App;
