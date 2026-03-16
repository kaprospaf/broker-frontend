import { useEffect, useState, useContext } from "react";
import PostCard from "./PostCard";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";

interface Post {
  id: number;
  title: string;
  description: string;
  price: number;
  category_name: string;       // changed from category
  listing_type_name?: string;  // changed from type
  condition_name?: string;
  image?: string;
  user_id: number;
  location?: string;
}

export default function PostsByCategory({
  category,
  listingType,
}: {
  category: string;
  listingType?: string;
}) {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const token = auth?.token ?? null;

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  const limit = 6;

  useEffect(() => {
    fetchPosts();
  }, [category, listingType, page]);

  const fetchPosts = async () => {
    const queryParams = new URLSearchParams({
      category: category,
      listing_type: listingType || "",
      page: page.toString(),
      limit: limit.toString(),
    });

    const res = await fetch(`${API}/api/posts?${queryParams}`);
    const data = await res.json();
    setPosts(data);
  };

  const deletePost = async (id: number) => {
    if (!token) {
      alert("You must be logged in");
      return;
    }

    if (!confirm("Are you sure?")) return;

    const res = await fetch(`${API}/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchPosts();
    else alert("Not authorized");
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={{ ...post, price: post.price.toString() }}
            isOwner={user?.id === post.user_id}
            onDelete={() => deletePost(post.id)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
}