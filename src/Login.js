import React, { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (event) => {
    event.preventDefault();
    console.log(email, password);
  }
  
  return (
    <form className="container" name="login" onSubmit={handleLogin}>
      <p>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          onChange={(event_ => {setEmmail(event.target.value)}
        />
      </p>
      <p>
          <label htmlFor="password">Password:</label>
          <input
            type="email"
            onChange={(event) => setPassword(event.target.value)}
          />
      </p>
          <button
            type="submit"
            disabled={!email && !password}
          />
    </form>
  );
};

export default Login;
