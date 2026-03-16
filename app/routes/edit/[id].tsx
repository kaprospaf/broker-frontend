import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setTitle(data.title));
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}