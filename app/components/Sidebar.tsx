import { Link } from "react-router";

interface Props {
  sidebarOpen: boolean;
}

export default function Sidebar({ sidebarOpen }: Props) {
  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <h3>Categories</h3>
      <Link to="/jobs">Jobs</Link>
      <Link to="/houses">Houses</Link>
      <Link to="/electronics">Electronics</Link>
      <Link to="/post">Post Item</Link>
    </aside>
  );
}
