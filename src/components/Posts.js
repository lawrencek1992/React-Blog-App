import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Posts = ({ posts, deletePost }) => {
    const { user } = useContext(UserContext);

    return (
        <article className="posts container">
            <h1>Posts</h1>
            <ul>
                {posts.length < 1 && (
                    <li key="empty">No posts yet!</li>
                )}
                {posts.map(post => (
                    <li key={post.key}>
                        <h2>
                            <Link to={`/post/${post.slug}`}>{post.title}</Link>
                        </h2>
                        <p><b>Author: </b>{post.author}</p>
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
                    </li>
                ))}
            </ul>
        </article>
    )
};

export default Posts;
