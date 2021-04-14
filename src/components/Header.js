import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
    const { user, onLogout } = useContext(UserContext);

    return (
        <header  className="App-header">
            <ul className="container">
                <li key="home">
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} />
                        Home
                    </Link>
                </li>
                {user.isAuthenticated && (
                    <li key="new-post">
                        <Link to="/new">
                            <FontAwesomeIcon icon={faEdit} />
                            New Post
                        </Link>
                    </li>
                )}
                {user.isAuthenticated && (
                    <li key="logout">
                        <button
                            className="logoutLink"
                            onClick={(event) => {
                                event.preventDefault();
                                onLogout();
                            }}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            Logout
                        </button>
                    </li>
                )}
                {!user.isAuthenticated && (
                    <li key="logout">
                        <Link to="/login">
                            <FontAwesomeIcon icon={faSignInAlt} />
                            Login
                        </Link>
                    </li>
                )}
            </ul>
            {user.isAuthenticated && (
                <div className="user">
                    Signed in as: <b>{user.email + " "}</b>
                    <FontAwesomeIcon icon={faUser} />
                </div>
            )}
        </header>
    );
};

export default Header;
