import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";

import "react-quill/dist/quill.snow.css";

const PostForm = ({ addNewPost }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [saved, setSaved] = useState(false);
    
    const handleAddNewPost = (event) => {
        event.preventDefault();
        if (!title) {
            alert("Title required in order to submit post!"); 
        } else if (!content) {
            alert("Please write a post before submitting!");
        } else {
            const post = {
                title: title,
                content: content
            };
            addNewPost(post);
            setSaved(true);
        }
    }
    if (saved === true) {
        return <Redirect to="/" />
    }
    
    return (
        <form className="container">
            <h1>Add a New Post</h1>
            <p>
                <label htmlFor="form-title">Title:</label>
                <br />
                <input
                    id="form-title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </p>
            <p>
                <label htmlFor="form-content">Content:</label>
            </p>
            <Quill
                onChange={(content, delta, source, editor) => {
                    setContent(editor.getContents() );
                }}
            />
            <p>
                <button type="submit">Save</button>
            </p>
        </form>
    );
}

export default PostForm;
