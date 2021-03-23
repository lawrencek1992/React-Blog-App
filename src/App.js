import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import Message from "./components/Message";
import NotFound from "./components/NotFound";

import "./App.css";

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = getNewSlugFromTitle(post.title);
    setPosts([...posts, post]);
    setFlashMessage(`saved`);
  };

  const getNewSlugFromTitle = (title) => 
    encodeURIComponent(title.toLowerCase().split(" ").join("-"));

  const updatePost = (post) => {
    post.slug = this.getNewSlugFromTitle(post.title);
    const index = posts.findIndex((p) => p.id === post.id);
    const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1));
    const updatedPosts = [...oldPosts, post].sort((a, b) => a.id - b.id);
    setPosts(updatedPosts);
    setFlashMessage(`updated`);
  }

  return (
    <Router>
      <div className="App">
        <Header />
        {message && <Message type={message} />}
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Posts posts={posts} />}
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
            path="/new"
            render={() => (
              <PostForm 
                    addNewPost={addNewPost}
                    post={{id: 0, slug: "", title: "", content: ""}}
              />
            )}
          />
          <Route
            path="/edit/:postSlug"
            render={(props) => {
              const post = posts.find(
                  (post) => post.slug === props.math.params.postSlug
              );
              if (post) {
                return <PostForm post={post} updatePost={updatePost}/>
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
