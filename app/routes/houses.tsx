import { useEffect, useState } from "react";
import API from "../utils/api";

interface Post {
  id: number;
  title: string;
  price: number;
  category: string;
}

export default function Houses() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch(`${API}/api/posts?category=Houses`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Houses</h2>

      {posts.length === 0 ? (
        <p>No houses found</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>${post.price}</p>
          </div>
        ))
      )}
    </div>
  );
}