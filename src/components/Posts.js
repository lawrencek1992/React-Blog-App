import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Posts = ({ posts, deletePost, post }) => { 
    const { user } = useContext(UserContext);

    const truncatePost = (post) => {
        const converter = new QuillDeltaToHtmlConverter(post.content.ops, {});
        const contentHTML = converter.convert();
        
        // There are numerous reasons why you don't like this option. But you could make it work if you had to. 
        // const preview = React.createElement("div", { dangerouslySetInnerHTML: { __html: contentHTML } });
        // return preview;


        const noHTML = contentHTML.replace(/<[^>]+>/g, '');
        const textOnly = noHTML.replace(/&#x?([0-9]{1,4}|[A-Z]);/gi, ' ');
        if ( textOnly.length < 100 ) {
            return "' " + textOnly + "'";
        }
        const postPreview = textOnly.replace(/^(.{100}[^\s]*).*/, "$1").trim();
        const lastChar = postPreview.charAt(postPreview.length - 1);
        if (lastChar === ","|"."|":"|";"|"!" ) {
            const newPreview = postPreview.slice(0, -1);
            return "' " + newPreview + "...'";
        } else {
            return "' " + postPreview + "...'";
        } 
    };

    return (
        <article className="posts-container">
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
                        {user.isAuthenticated && user.email === post.author ? (
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
                        )
                        :
                        <p>
                            <br />
                        </p>
                        }
                        <p className={(user.isAuthenticated && user.email === post.author) ? "author-preview" : "not-author-preview"}>
                            <em>{truncatePost(post)}</em>
                            <br />
                                <Link to={`/post/${post.slug}`} className="see-more">
                                    <span>. . .</span>
                                </Link>
                        </p>
                    </li>
                ))}
            </ul>
        </article>
    )
};

export default Posts;