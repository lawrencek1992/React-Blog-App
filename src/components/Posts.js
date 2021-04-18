import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Posts = ({ posts, deletePost, post }) => {
    const { user } = useContext(UserContext);

    const truncatePost = (post) => {
        if ( post.length < 100 ) {
            return "' " + post + "'";
        }
        const postPreview = post.replace(/^(.{100}[^\s]*).*/, "$1");
        console.log(postPreview);
        if ( postPreview.charAt(postPreview.length -1) !== /[^a-zA-Z]/ ) {
            const newPreview = postPreview.slice(0, -2);
            console.log(newPreview);
            return "' " + newPreview + "...'";
        } else {
            return "' " + postPreview + "...'";
        }
    } 

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
                        <p className={(user.isAuthenticated && user.email === post.author) ? "author-preview" : "not-author-preview"}>
                            <em>{truncatePost(post.content.ops[0].insert)}</em>
                            <br />
                            {post.content.ops[0].insert.length > 100 && (
                                <Link to={`/post/${post.slug}`} className="see-more">
                                    <span>. . .</span>
                                </Link>
                            )}
                        </p>
                    </li>
                ))}
            </ul>
        </article>
    )
};

export default Posts;