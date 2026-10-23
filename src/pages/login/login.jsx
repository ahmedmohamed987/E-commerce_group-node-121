import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
    FaAmazon, 
    FaUser, 
    FaLock, 
    FaEye, 
    FaEyeSlash, 
    FaArrowLeft, 
    FaCircleExclamation 
} from "react-icons/fa6";
import { toast } from "react-toastify";
import "./login.css";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                console.error("Login Failed", data);
                const message = data.message || "Invalid username or password";
                setError(message);
                toast.error(message);
            } else {
                console.log("Login Successfully", data);
                const token = data.token || data.accessToken || "demo-token";
                localStorage.setItem("token", token);
                toast.success("Login Successful!");
                navigate("/home");
            }
        } catch (err) {
            console.error(`Error During Login: ${err}`);
            setLoading(false);
            const message = "An error occurred during login. Please try again.";
            setError(message);
            toast.error(message);
        }
    }

    function handleFillDemo() {
        setUsername("emilys");
        setPassword("emilyspass");
        setError(null);
    }

    return (
        <div className="login-page">
            <Link to="/home" className="login-brand" title="Go to Home">
                <FaAmazon className="login-brand-icon" />
                <h1>Amazon</h1>
            </Link>

            <div className="login-card">
                <h2 className="login-title">Sign in</h2>
                <p className="login-subtitle">Sign in to your Amazon account</p>

                {error && (
                    <div className="login-error-alert" role="alert">
                        <FaCircleExclamation className="login-error-icon" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-field">
                        <label htmlFor="username">Username</label>
                        <div className="login-input-wrapper">
                            <FaUser className="login-input-icon" />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="login-input"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="login-field">
                        <label htmlFor="pass">Password</label>
                        <div className="login-input-wrapper">
                            <FaLock className="login-input-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="pass"
                                name="password"
                                className="login-input"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="login-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={loading}
                    >
                        {loading && <span className="login-spinner" />}
                        <span>{loading ? "Signing in..." : "Sign in"}</span>
                    </button>
                </form>

                <div className="login-demo-box">
                    <div className="login-demo-header">
                        <span>Demo Credentials</span>
                        <button
                            type="button"
                            className="login-demo-btn"
                            onClick={handleFillDemo}
                        >
                            Auto-fill
                        </button>
                    </div>
                    <div className="login-demo-details">
                        <span>User: <code>emilys</code></span>
                        <span>Pass: <code>emilyspass</code></span>
                    </div>
                </div>

                <div className="login-footer-links">
                    <Link to="/home" className="login-back-home">
                        <FaArrowLeft /> Back to Home
                    </Link>
                    <p className="login-terms">
                        By signing in, you agree to Amazon's Conditions of Use & Sale.
                    </p>
                </div>
            </div>
        </div>
    );
}