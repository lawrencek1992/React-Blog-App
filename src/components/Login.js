import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Login = (props) => {
    const { onLogin } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        onLogin(email, password);
    };

    return (
        <form className="login-container" name="login" onSubmit={handleLogin}>
            <p>
                <label htmlFor="email">Email:</label>
                <input type="email" className="email-input" onChange={(e) => setEmail(e.target.value)} />
            </p>
            <p>
                <label htmlFor="password">Password:</label>
                <input type="password" className="password-input" onChange={(e) => setPassword(e.target.value)} />
            </p>
            <p>
                <button type="submit" disabled={!email && !password}>Login</button>
                <Link type="cancel" to="/">Cancel</Link>
            </p>
        </form>
    );
};

export default Login;
