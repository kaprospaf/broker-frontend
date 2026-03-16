import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface Post {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  user: string;
}

export default function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  // Filter by category
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter(p => p.category === selectedCategory);

  // Only current user posts
  const myPosts = user
    ? posts.filter(p => p.user === user.id)
    : [];

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
    });

    setPosts(posts.filter(post => post._id !== id));
  };

  return (
    <div className="home-container">

      <h1>Marketplace</h1>

      {/* CATEGORY FILTER */}
      <div className="filter-bar">
        {["All", "Jobs", "Furniture", "Electronics", "Houses"].map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MY POSTS */}
      {user && (
        <>
          <h2>Your Posts</h2>
          <div className="grid">
            {myPosts.map(post => (
              <div key={post._id} className="card">
                {post.image && (
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt={post.title}
                  />
                )}

                <div className="card-body">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <strong>£{post.price}</strong>

                  <div className="card-buttons">
                    <button className="edit-btn">Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ALL / FILTERED POSTS */}
      <h2>Recent Posts</h2>
      <div className="grid">
        {filteredPosts.map(post => (
          <div key={post._id} className="card">
            {post.image && (
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title}
              />
            )}

            <div className="card-body">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <strong>£{post.price}</strong>
              <span className="category">{post.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}