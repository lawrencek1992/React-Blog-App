import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Link } from "react-router-dom";

import Buttons from "./Buttons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Post = ({ post }) => {
  const { user } = useContext(UserContext);
  const converter = new QuillDeltaToHtmlConverter(post.content.ops, {});
  const contentHTML = converter.convert();

  return (
    <article className="post container">
      <h1>{ post.title }</h1>
      {user.isAuthenticated && user.email === post.author && (
        <p>
          <Link to={`/edit/${post.slug}`}>
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </Link>
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
