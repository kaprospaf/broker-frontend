import { Outlet, Link } from "react-router";

export default function DashboardLayout() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      <nav style={{ marginBottom: 20 }}>
        <Link to="/dashboard">Overview</Link> |{" "}
        <Link to="/dashboard/posts">My Posts</Link>
      </nav>

      <Outlet />
    </div>
  );
}