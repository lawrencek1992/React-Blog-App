import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
    <article className="not-found-container">
        <h1>Error 404!</h1>
        <p>
            Content not found.
            <br />
            <Link to="/">Return to posts</Link>
        </p>
    </article>
);

export default NotFound;