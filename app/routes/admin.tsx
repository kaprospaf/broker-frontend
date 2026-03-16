"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.role !== "admin") return;

    fetch(`${API}/api/users`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [user]);

  if (user?.role !== "admin") {
    return <h2>Access Denied</h2>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {users.map((u: any) => (
        <div key={u.id}>
          {u.name} - {u.email} - {u.role}
        </div>
      ))}
    </div>
  );
}