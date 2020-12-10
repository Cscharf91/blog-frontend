import Axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState({ email: "", password: "" });

  useEffect(() => {
    getPosts();
    const currentUser = localStorage.getItem('user');
    const currentToken = localStorage.getItem('token');
    if (currentUser) setUser(JSON.parse(currentUser));
    if (currentToken) setToken(currentToken);
  }, [])

  const getPosts = async () => {
    try {
      const data = await Axios.get('http://localhost:3005/api/posts');
      setPosts(data.data);
    } catch(err) {
      console.log(err);
    }
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'auth-token': token
        }
      }
      const data = await Axios.post('http://localhost:3005/api/posts/', { ...newPost, user: user.name }, config);
      console.log(data);
      window.location = '/';
    } catch(err) {
      console.log(err);
    }
  }

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

  const onChangePost = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  }

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  const deletePost = async (post) => {
    const config = {
      headers: {
        'auth-token': token
      }
    }
    const data = await Axios.delete(`http://localhost:3005/api/posts/${post._id}`, config);
    console.log(data);
    setPosts(posts.filter(current => current._id !== post._id))
  }

  return (
    <Router>
      <NavBar 
        login={login}
        logOut={logOut}
        user={user}
        token={token}
        handleLoginSubmit={handleLoginSubmit}
        onChangeLogin={onChangeLogin}
      />
      <Switch>
      <Route path="/" exact
        render={props => <Posts {...props}
          user={user}
          token={token}
          deletePost={deletePost}
          posts={posts}
        />
      }
      />
      <Route path="/create" exact
        render={props => <CreatePost {...props}
          handlePostSubmit={handlePostSubmit}
          onChangePost={onChangePost}
          newPost={newPost}
        />
      }
      />
      <Route path="/edit/:id" exact
        render={props => <EditPost {...props}
          token={token}
        />
      }
      />
      </Switch>
    </Router>
  );
}

export default App;
