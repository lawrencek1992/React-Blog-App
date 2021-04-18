import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Posts = ({ posts, deletePost, post }) => {
    const { user } = useContext(UserContext);

    return (
        <article className="posts container">
            <h1>Posts</h1>
            <ul>
                {posts.length < 1 && (
                    <li key="empty">No posts yet!</li>
                )}
                {posts.map(post => (
                    <li key={post.key} className={(user.isAuthenticated && user.email === post.author) ? "logged-in" : ""}>
                        <h2>
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </h2>
                        <p><b>Author:</b>
                        {post.author.length > 23 ? " Demo Account" : " Kelly Lawrence" }
                        </p>
                        <p><b>Posted On: </b>{post.date}</p>
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
                        <p className="postPreview"><em>The content of this post is: " {post.content.ops[0].insert}"</em></p>
                        {console.log(post.content.ops[0].insert)}
                    </li>
                ))}
            </ul>
        </article>
    )
};

export default Posts;