import React from 'react';
import { useState } from 'react';
import './Auth.css'; // Import the CSS file
import LoginNavbar from './LoginNavbar';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            setSuccess("Registration successful! You can now log in.");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <LoginNavbar/>
        <div className="auth-container">
            <h2>Create an Account</h2>
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
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
                <button type="submit" className="auth-button">Register</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
            <p className="footer-text">Already have an account? <a href="/login">Log in</a></p>
        </div>
        </div>
    );
};

export default Register;
