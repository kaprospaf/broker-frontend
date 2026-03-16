import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

interface Post {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  location?: string;
  type?: string;
}

export default function MyPosts() {
  const auth = useContext(AuthContext);

  if (!auth) throw new Error("AuthContext not provided");

  const { token } = auth;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/posts/my-posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const res = await fetch(
      `http://localhost:5000/api/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      setPosts(prev => prev.filter(post => post.id !== id));
    } else {
      alert("Not authorized");
    }
  };

  return (
    <ProtectedRoute>
      <div className="my-posts-container">
        <h1 className="my-posts-title">My Posts</h1>

        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>You have not posted anything yet.</p>
        ) : (
          <div className="my-posts-grid">
            {posts.map(post => (
              <div key={post.id} className="my-post-card">
                {post.image && (
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt={post.title}
                  />
                )}

                <h3>{post.title}</h3>
                <p>{post.description}</p>

                <strong>
                  ${post.price.toLocaleString()}
                </strong>

                <div className="card-buttons">
                  <a
                    href={`/edit/${post.id}`}
                    className="edit-btn"
                  >
                    Edit
                  </a>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}