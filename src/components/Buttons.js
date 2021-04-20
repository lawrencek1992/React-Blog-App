import React from "react";
import {
    Email,
    // Facebook,
    Pinterest,
    Reddit,
    Twitter
} from "react-sharingbuttons";

const buttonsWrapperStyles = {
    paddingTop: 50,
    marginTop: 75,
    marginBottom: 100,
}

const Buttons = () => {
    //const url = `https://lawrence-coding-blog.netlify.app/`;
    const url = window.location.href;
    const shareText = "Check out this blog!";

    return (
        <div style={buttonsWrapperStyles}>
            <p className="share-msg"><b>Share Post:</b></p>
        {/* The Facebook button isn't working. You couldn't fit it. You opened an issue about it on Github and are waiting for a response. Keep button commented out for now. */}
            {/* <Facebook url={url} /> */}
            <Twitter url={url} shareText={shareText} />
            <Email url={url} subject={shareText} />
            <Pinterest url={url} shareText={shareText} mediaSrc={url}/>
            <Reddit url={url} shareText={shareText} />
        </div>
    );
}

export default Buttons;
