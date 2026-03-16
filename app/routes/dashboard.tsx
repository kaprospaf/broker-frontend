"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

  const [categoryId, setCategoryId] = useState("1");
  const [listingTypeId, setListingTypeId] = useState("1");
  const [conditionId, setConditionId] = useState("1");

  const [image, setImage] = useState<File | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth?.token) {
      alert("You are not logged in");
      return;
    }

    if (!title || !description || !price || !location) {
      alert("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("location", location);

      formData.append("category_id", categoryId);
      formData.append("listing_type_id", listingTypeId);
      formData.append("condition_id", conditionId);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch(`${API}/api/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Post created successfully!");

        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setCategoryId("1");
        setListingTypeId("1");
        setConditionId("1");
        setImage(null);

        window.location.href = "/myposts";
      } else {
        alert(data.message || "Error creating post");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <ProtectedRoute>
      <div className="dashboard">
        <h2>Create Post</h2>

        <form onSubmit={submit}>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            required
          />

          {/* CATEGORY */}
          <select
            value={categoryId}
            onChange={(e)=>setCategoryId(e.target.value)}
          >
            <option value="1">House</option>
            <option value="2">Electronics</option>
            <option value="3">Furniture</option>
            <option value="4">Vehicle</option>
            <option value="5">Other</option>
          </select>

          {/* SALE OR RENT */}
          <select
            value={listingTypeId}
            onChange={(e)=>setListingTypeId(e.target.value)}
          >
            <option value="1">For Sale</option>
            <option value="2">For Rent</option>
          </select>

          {/* CONDITION */}
          <select
            value={conditionId}
            onChange={(e)=>setConditionId(e.target.value)}
          >
            <option value="1">New</option>
            <option value="2">Used</option>
          </select>

          <input
            type="file"
            onChange={(e)=>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />

          <button type="submit">Create Post</button>

        </form>
      </div>
    </ProtectedRoute>
  );
}