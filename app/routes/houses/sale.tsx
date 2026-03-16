import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import PostCard from "../../components/PostCard";

export default function HousesForSale() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API}/api/posts?category=House&listing_type=For Sale`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Houses For Sale</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p>No houses for sale available.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}