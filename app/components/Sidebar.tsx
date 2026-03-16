export default function Sidebar() {
  return (
    <div className="sidebar flex flex-col space-y-2 p-4">
      {/* All should go to root */}
      <a href="/" className="hover:text-blue-500">All</a>

      <a href="/jobs" className="hover:text-blue-500">Jobs</a>
      <a href="/houses" className="hover:text-blue-500">Houses</a>
      <a href="/electronics" className="hover:text-blue-500">Electronics</a>
      <a href="/furniture" className="hover:text-blue-500">Furniture</a>

      {/* No space in URL */}
      <a href="/dashboard" className="hover:text-blue-500">
        Post Item
      </a>
    </div>
  );
}