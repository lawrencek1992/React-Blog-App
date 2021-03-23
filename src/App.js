import React, { useState } from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import PostForm from "./components/PostForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";

const App = (props) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      slug: "hello-react",
      title: "Hello React",
      content: "Lorem.",
    },
    {
      id: 2,
      slug: "hello-project",
      title: "Hello Project",
      content: "Tothe.",
    },
    {
      id: 3,
      slug: "hello-blog",
      title: "Hello Blog",
      content: "Ipsum.",
    },
  ]);
  
  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = encodeURIComponent(
      post.title.toLowerCase().split(" ").join("-")
    );
    setPosts([...posts, post]);
  };
  
  return (
    <Router>
      <div className="App">
        <Header />
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
            component={PostForm} 
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
