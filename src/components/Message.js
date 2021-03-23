import React from "react";

const Message = ({ type }) => {
    const messages = {
        saved: "Your post has been saved!",
        updated: "Your post has been updated!",
        deleted: "Your post has been deleted."
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