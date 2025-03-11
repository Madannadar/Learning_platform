import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Runs only on mount

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={user.profileImage || "https://via.placeholder.com/100"}
          alt="User Profile"
        />
        <h2 className="text-xl font-semibold mt-2">{user.username}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="mt-4 space-y-2">
        <p><strong>Occupation:</strong> {user.occupation}</p>
        <p><strong>Location:</strong> {user.location}</p>
      </div>
    </div>
  );
};

export default Profile;
