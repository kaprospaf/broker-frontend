import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import API from "../utils/api";

export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      auth?.login(data);

      // ✅ Use navigate instead of window.location
      navigate("/dashboard");
    } catch {
      setError("Server error");
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button type="submit">Login</button>

      <p>
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
    </form>
  );
}