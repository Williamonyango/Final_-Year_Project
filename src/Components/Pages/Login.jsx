import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/images/LOGO3.png";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const [action, setAction] = useState("Login");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        const validUsername = "admin@gmail.com";
        const validPassword = "admin";
        if (email === validUsername && password === validPassword) {
            localStorage.setItem("authToken", "dummyToken");
            navigate("/home");

        } else {
            setError("Invalid username or password");
        }
    };

    const handleSignUp = () => {
        setAction("Sign Up");
    };
    const handleLogin = () => {
        setAction("Login");
    }

    return (
        <div className="login">
            <div className="login-hero">
                <img src={logo} alt="logo" />
            </div>
            <div className="container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>{action}</h1>
                    {action === "Login" ? <div></div> : <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="text"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setError("")
                            }}
                            required
                        />
                    </div>}


                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setError("")

                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError("")
                            }}
                            required
                        />
                    </div>
                    {action === "Login" ? <div></div> : <div className="form-group">
                        <label htmlFor="password">Confirm Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Confirm your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>}
                    {action === "Sign Up" ? <div></div> : <div className="forgot-password">Forgot password <span>Click here</span></div>}

                    <button type="submit" className={action === "Login" ? "btn btn-primary" : "btn btn-secondary"} onClick={handleLogin}>
                        Login
                    </button>
                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    <button type="button" className={action == "Sign Up" ? "btn btn-primary" : "btn btn-secondary"} onClick={handleSignUp}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>

    );
}

export default Login;
