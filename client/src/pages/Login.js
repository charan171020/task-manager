import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      const res = await axios.post(
        "https://task-manager-l102.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful 🚀");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to manage your tasks</p>

        <div className="input-box">
          <span>📧</span>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-box">
          <span>🔒</span>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;