import { useState } from "react";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Jobs");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!title) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          category,
          userId: "PUT_USER_ID_HERE", // 🔥 replace with real logged user id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Post Created Successfully!");

      setTitle("");
      setDescription("");
      setPrice("");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Create Post</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Jobs">Jobs</option>
        <option value="Houses">Houses</option>
        <option value="Electronics">Electronics</option>
      </select>

      <br /><br />

      <button onClick={submitHandler} disabled={loading}>
        {loading ? "Posting..." : "Submit"}
      </button>
    </div>
  );
}
