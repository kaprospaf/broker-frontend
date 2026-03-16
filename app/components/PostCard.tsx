import React from "react";

interface Post {
  id: number;
  title: string;
  description?: string;
  price?: number;
  location?: string;
  image?: string;
  condition_name?: string;
}

interface PostCardProps {
  post: Post;
  isOwner?: boolean;
  onDelete?: () => void;
}

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function PostCard({ post, isOwner, onDelete }: PostCardProps) {
  return (
    <div className="post-card">

      {/* IMAGE */}
      {post.image && (
        <img
          src={`${API}/uploads/${post.image}`}
          alt={post.title}
          className="post-image"
        />
      )}

      <div className="post-content">

        {/* TITLE */}
        <h3>{post.title}</h3>

        {/* CONDITION BADGE */}
        {post.condition_name && (
          <span
            className={
              post.condition_name === "New"
                ? "badge badge-new"
                : "badge badge-used"
            }
          >
            {post.condition_name}
          </span>
        )}

        {/* PRICE */}
        {post.price && <p className="price">${post.price}</p>}

        {/* LOCATION */}
        {post.location && <p className="location">{post.location}</p>}

        {/* DESCRIPTION */}
        {post.description && <p className="desc">{post.description}</p>}

        {/* OWNER BUTTONS */}
        {isOwner && (
          <div className="post-actions">
            <button onClick={onDelete} className="delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}