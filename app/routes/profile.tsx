import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Profile() {
  const auth = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <div className="profile-page">
        <h2>My Profile</h2>

        <div className="profile-card">
          <p><strong>Name:</strong> {auth?.user?.name}</p>
          <p><strong>Email:</strong> {auth?.user?.email}</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}