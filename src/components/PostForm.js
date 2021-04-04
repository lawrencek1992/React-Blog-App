import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";

import "react-quill/dist/quill.snow.css";

const PostForm = ({ post: propsPost, addNewPost, updatePost }) => {
    const [saved, setSaved] = useState(false);
    const [post, setPost] = useState({...propsPost});

    const prevPostRef = useRef();
    useEffect(() => {
        prevPostRef.current = post;
    }, [post]);
    const prevPost = prevPostRef.current;

    // If the user has navigated from editing a post to adding a new one, set the post state object equal to that of the new propsPost value and clear the Quill editor with the custom methods it provides [getEditor() and setContents()].
    const quillRef = React.useRef();
    useEffect(() => {
        if (prevPost && quillRef.current) {
            if (propsPost.id !== prevPost.id) {
                setPost({ ...propsPost });
                quillRef.current.getEditor().setContents(``);
            }
        }
    }, [prevPost, propsPost]);

    const handleAddNewPost = (event) => {
        event.preventDefault();
        if (post.title && post.content) {
            if (updatePost) {
                updatePost(post);
            } else {
                addNewPost(post);
            }
            setSaved(true);
        } else if (!post.title) {
            alert("Title required in order to submit post!");
        } else if (!post.content) {
            alert("Please write a post before submitting!");
        }
    }
    if (saved === true) {
        console.log("Post saved");
        return <Redirect to="/" />
    }
    return (
        <form className="container" onSubmit={handleAddNewPost}>
            <h1>Add New Post</h1>
            <p>
                <label htmlFor="form-title">Title:</label>
                <br />
                <input
                    defaultValue={post.title}
                    id="form-title"
                    value={post.title}
                    onChange={(event) => 
                        setPost({
                        ...post,
                        title: event.target.value
                        })
                    }
                />
            </p>
            <p>
                <label htmlFor="form-content">Content:</label>
            </p>
            <Quill
                ref={quillRef}
                defaultValue={post.content}
                onChange={(content, delta, source, editor) => {
                    setPost({
                        ...post,
                        content: editor.getContents() 
                    });
                }}
            />
            <p>
                <button type="submit">Submit</button>
            </p>
        </form>
    );
}

export default PostForm;
