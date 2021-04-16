import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useStorageState } from "react-storage-hooks";
import { Helmet } from "react-helmet";

import UserContext from "./context/UserContext";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import Message from "./components/Message";
import Login from "./components/Login";
import firebase from "./firebase";
import NotFound from "./components/NotFound";

import "./App.css";

const App = (props) => {
  const [user, setUser] = useStorageState(localStorage, "state-user", {});
  const [posts, setPosts] = useStorageState(localStorage, `state-posts`, []);
  const [message, setMessage] = useState(null);

  const onLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser({
          email: response.user["email"],
          isAuthenticated: true,
        });
      })
      .catch((error) => console.error(error));
    };
  
  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser({ isAuthenticated: false});
      })
      .catch((error) => console.error(error));
    setFlashMessage(`loggedOut`);
    return (
      <Redirect to="/" />
    )
  };

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  const addNewPost = (post) => {
    const postsRef = firebase.database().ref("posts");
    const dateNow = new Date(Date.now());
    const dateString = dateNow.toDateString();
    post.slug = getNewSlugFromTitle(post.title);
    post.author = user.email; 
    post.date = dateString;
    delete post.key;
    setFlashMessage(`saved`);
    postsRef.push(post);
    return (
      <Redirect to="/" />
    )
  };

  const getNewSlugFromTitle = (title) => 
    encodeURIComponent(title.toLowerCase().split(" ").join("-"));

  const updatePost = (post) => {
    const postRef = firebase.database().ref("posts/" + post.key);
    const dateNow = new Date(Date.now());
    const dateString = dateNow.toDateString();
    postRef.update({
      slug: getNewSlugFromTitle(post.title),
      title: post.title,
      content: post.content,
      author: user.email,
      date: dateString,
    });
    setFlashMessage(`updated`);
    return (
      <Redirect to="/" />
    );
  };

  const deletePost = (post) => {
      if (user.isAuthenticated && user.email === post.author) {
        if (window.confirm("Delete this post?") === true) {
          const postRef = firebase.database().ref("posts/" + post.key);
          postRef.remove();
          setFlashMessage(`deleted`);
        }
      } else {
        setFlashMessage(`cannotDelete`);
      }
  };

  useEffect(() => {
    const postsRef = firebase.database().ref("posts");
    //The on() firebase method gives a "snapshot" of what's in the database. 
    postsRef.on("value", (snapshot) => {
      const posts = snapshot.val();
      const postsState = [];
      for (let post in posts) {
        postsState.push({
          //Each post retrieved from Firebase is actually the post key, so this value is assigned to "key" in the object. 
          key: post,
          slug: posts[post].slug,
          title: posts[post].title,
          content: posts[post].content,
          author: posts[post].author,
          date: posts[post].date,
        });
      }
      setPosts(postsState);
    });
  }, [setPosts]);

  return (
    <Router>
      <UserContext.Provider value={{ user, onLogin, onLogout }}>
        <div className="App">
          <Helmet>
            <title>Coding Blog</title>
          </Helmet>
          <Header />
          {message && <Message type={message} />}
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Posts posts={posts} deletePost={deletePost}/>}
          />
            <Route
              path="/post/:postSlug"
              render={(props) => {
                const post = posts.find(
                  (post) => post.slug === props.match.params.postSlug
                );
                if (post) return <Post post={post} />;
                else return <NotFound />;
              }}
            />
            <Route
                exact
                path="/login"
                render={() => 
                  !user.isAuthenticated ? <Login /> : <Redirect to="/" />
                }
            />
            <Route
              exact
              path="/new"
              render={() => 
                user.isAuthenticated ? (
                  <PostForm 
                    addNewPost={addNewPost}
                    post={{key: null, slug: "", title: "", content: ""}} 
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/edit/:postSlug"
              render={(props) => {
                const post = posts.find(
                  (post) => post.slug === props.match.params.postSlug
                );
                if (post) {
                  if (user.isAuthenticated && post.author === user.email) {
                    return <PostForm updatePost={updatePost} post={post} />;
                  } else {
                    setFlashMessage(`cannotEdit`);
                    return <Redirect to="/" />;
                  }
                }
              }}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
