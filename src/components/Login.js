// src/Login.js
import React from 'react';
import { useState } from 'react';
import './Auth.css'; // Import the CSS file
import Navbar from './Navbar';
import LoginNavbar from './LoginNavbar';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const { token } = await response.json();

            // Store the token in localStorage
            localStorage.setItem("token", token); // Save token in localStorage
            console.log("Logged in successfully:", token);

            // Optionally, redirect the user to the home page or dashboard
            window.location.href = '/make-bookings'; // Redirect to home after login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
        <LoginNavbar/>
       
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className="auth-button">Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p className="footer-text">Don't have an account? <a href="/register">Register here</a></p>
        </div>
        </div>
    );
};

export default Login;
