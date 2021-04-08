import React from "react";

const Message = ({ type }) => {
    const messages = {
        saved: "Your post has been saved!",
        updated: "Your post has been updated!",
        deleted: "Your post has been deleted.",
        cannotEdit: "Your account does not have permission to edit this post.",
        cannotDelete: "Your account does not have permission to delete this post.",
    };
    return (
        <div className={`App-message ${type}`}>
            <p className="container">
                <strong>{messages[type]}</strong>
            </p>
        </div>
    );
};

export default Message;
