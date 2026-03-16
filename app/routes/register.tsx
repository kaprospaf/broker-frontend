"use client";

import { useState } from "react";
import API from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Account created! Please login.");
      window.location.href = "/login";
    } else {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={submit} className="form">
      <h2>Sign Up</h2>

      <input
        placeholder="Name"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

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

      <button type="submit">Create Account</button>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
}