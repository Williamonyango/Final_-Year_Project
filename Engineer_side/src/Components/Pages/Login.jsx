import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/LOGO3.png";
import "./Login.css";
import LockIcon from "../../assets/icons/LockIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import UserIcon from "../../assets/icons/UserIcon";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: ""
    });
    const Pockethost_URL = 'https://zamar.pockethost.io/';

    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
        setError("");
        setSuccessMessage("");
    };

    useEffect(() => {
        // Apply styles when component mounts
        document.body.style.backgroundColor = "#f5f7fa";
        return () => {
            // Reset styles when component unmounts
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword, name } = formData;

        // Validation
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        if (!isLogin && !name) {
            setError("Please enter your name");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setIsLoading(true);
        try {
            if (isLogin) {
                const response = await axios.get(`${Pockethost_URL}/api/collections/Nyandiga/records`, {
                    params: {
                        filter: `Email='${email}' && IdNumber='${password}'`
                    }
                });

                if (response.data.items && response.data.items.length > 0) {
                    const user = response.data.items[0];
                    // Store user info and navigate - if server returned data, credentials are correct
                    localStorage.setItem("authToken", user.id);
                    localStorage.setItem("userName", user.Name);
                    navigate("/landingpage");
                } else {
                    setError("Invalid username or password");
                }
            }else {
                //sign up logic
                //firt check if the email is already exist

                const checkEmailResponse = await axios.get(`${Pockethost_URL}/api/collections/Nyandiga/records`, {
                    params: {
                        filter: `Email='${email}'`
                    }
                });

                if (checkEmailResponse.data.items && checkEmailResponse.data.items.length > 0) {
                    setError("Email already registered. Please sign in.");
                    return;
                }

                //if email is not exist, then create a new user
                const newUser = {
                    Email: email,
                    FirstName: name,
                    IdNumber: password
                };

                const createResponse = await axios.post(`${Pockethost_URL}/api/collections/Nyandiga/records`, newUser);

                if(createResponse.data.id){
                    setSuccessMessage("Account created successfully. Please sign in.");
                    setFormData({
                        email: email,
                        password: "",
                        confirmPassword: "",
                        name: ""
                    });
                    //switch to login mode
                    setIsLogin(true);
                } else {
                setError("Failed to create account. Please try again.");
            }
        }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError("");
        setSuccessMessage("");
    };

    return (
        <div className="login">
            <div className="login-left">
                <div className="login-left-content">
                    <h2>Kenya Power & Lighting Company</h2>
                    <p>Apply for a permit online.</p>

                    <div className="login-feature">
                        <div className="login-feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className="login-feature-text">View and pay your electricity bills</div>
                    </div>

                    <div className="login-feature">
                        <div className="login-feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <div className="login-feature-text">Monitor your usage in real-time</div>
                    </div>

                    <div className="login-feature">
                        <div className="login-feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                        </div>
                        <div className="login-feature-text">Get outage notifications</div>
                    </div>
                </div>
            </div>

            <div className="login-right">
                <div className="login-hero">
                    <img src={logo} alt="KPLC logo" className="login-logo" />
                </div>

                <div className="container">
                    <form onSubmit={handleSubmit} className="login-form">
                        <h1>{isLogin ? "KPLC Permit Portal" : "Create New Account"}</h1>
                        <p className="login-subtitle">
                            {isLogin ? "Sign in to access your account" : "Register for online services"}
                        </p>
                            {successMessage && <p style={{
                                    color: '#2e7d32',
                                    backgroundColor: '#e8f5e9',
                                    padding: '10px 15px',
                                    borderRadius: '4px',
                                    marginBottom: '15px',
                                    border: '1px solid #c8e6c9',
                                    fontWeight: '500'
                                }}>{successMessage}</p>}
                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <UserIcon />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <EmailIcon />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder={isLogin ? "Enter your password" : "Create a password"}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <PasswordIcon />
                        </div>

                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="form-control"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <PasswordIcon />
                            </div>
                        )}

                        {isLogin && (
                            <div className="forgot-password">
                                Forgot password? <span>Click here</span>
                            </div>
                        )}

                        {error && <p className="error-message">{error}</p>}

                        <div className="button-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : isLogin ? "Sign In Securely" : "Create Account"}
                            </button>

                            <div className="login-divider">or</div>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={toggleMode}
                                disabled={isLoading}
                            >
                                {isLogin ? "Create New Account" : "Back to Login"}
                            </button>
                        </div>

                        <div className="security-badge">
                            <LockIcon /> Secured by 256-bit encryption
                        </div>
                    </form>
                </div>

                <div className="login-footer">
                    &copy; 2025 Kenya Power & Lighting Company Ltd. All rights reserved.<br />
                    <a href="#">Terms of Service</a> • <a href="#">Privacy Policy</a> • <a href="#">Help Center</a>
                </div>
            </div>
        </div>
    );
}

export default Login;