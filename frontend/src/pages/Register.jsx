import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const API = "http://localhost:5001/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed 💔");
      }
    } catch {
      setError("Network error. Please try again 🌸");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const strongPassword = (pwd) => pwd.length >= 6;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-hero">
          <h1>Join Us 🌸</h1>
          <p>Start your wellness journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Name 💝</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength="2"
            />
          </div>

          <div className="form-group">
            <label>Email 📧</label>
            <input
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={!validateEmail(email) && email ? "invalid" : ""}
              required
            />
          </div>

          <div className="form-group">
            <label>Password 🔐</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={!strongPassword(password) && password ? "invalid" : ""}
                required
                minLength="6"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading || !name || !email || !password || password.length < 6}>
            {loading ? "Creating..." : "Create Account 💖"}
          </button>

          <p className="auth-link">
            Already have account? <Link to="/">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

