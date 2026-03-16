import { useEffect, useState } from "react";
import API from "../utils/api";
import PostCard from "../components/PostCard";

export default function Jobs() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API}/api/posts?category=Jobs`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Jobs</h2>
      <div className="grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}