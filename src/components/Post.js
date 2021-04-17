import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Link, useHistory } from "react-router-dom";
import firebase from "../firebase";

import Buttons from "./Buttons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Post = ({ post }) => {
  const { user } = useContext(UserContext);
  const converter = new QuillDeltaToHtmlConverter(post.content.ops, {});
  const contentHTML = converter.convert()
  const history = useHistory();

  // Unlike deletePost in App.js, this function uses history from react-router-dom to return the user back to the home page.
  const deletePost = () => {
    if (window.confirm("Delete this post?") === true) {
      const postRef = firebase.database().ref("posts/" + post.key);
      postRef.remove();
      history.push('/');
    }
  };

  return (
    <article className="post container">
      <h1>{ post.title }</h1>
      {user.isAuthenticated && user.email === post.author && (
        <p>
          <Link to={`/edit/${post.slug}`}>
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </Link>
          <button className="linkLike" onClick={deletePost}><FontAwesomeIcon icon={faTrashAlt} />Delete</button>
        </p>
      )}
      <h4>{ post.date }</h4>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      />
      <p>
        <Buttons />
      </p>
    </article>
  );
};

export default Post;
