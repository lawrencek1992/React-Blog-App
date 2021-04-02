import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Header = (props) => {
    const { user, onLogout } = userContext(UserContext);

    return (
        <header  className="App-header">
            <ul className="container">
                <li key="home">
                    <Link to="/">My Site</Link>
                </li>
                {user.isAuthenticated ? (
                    <li key="new-post">
                        <Link to="/new">New Post</Link>
                    </li>
                    ) : (
                    <li key="login">
                        <Link to="/login">Login</Link>
                    </li>
                )}
            </ul>
        </header>
    );
};

export default Header;
