import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Post = ({ post, deletePost }) => {
  const { user } = useContext(UserContext);
  const converter = new QuillDeltaToHtmlConverter(post.content.ops, {});
  const contentHTML = converter.convert();
  const postDate = new Date(post.date).toDateString();

  return (
    <article className="post container">
      <h1>{ post.title }</h1>
      {user.isAuthenticated && user.email === post.author && (
        <p>
          <Link to={`/edit/${post.slug}`}>
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </Link>
          {" | "}
          <button className="linkLike" onClick={() => deletePost(post)}>
            <FontAwesomeIcon icon={faTrashAlt} />
            Delete
          </button>
        </p>
      )}
      <h4>{ postDate }</h4>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      />
    </article>
  );
};

export default Post;
