import React, { useState } from "react";
import axios from "../../axios.js";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading.jsx"; // Import the Loading component

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading screen

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);

    try {
      const response = await axios.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
      console.error("Registration error:", err);
    } finally {
      setLoading(false); // Hide loading screen
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Loading Component */}
      <Loading isLoading={loading} />

      <div className="p-6 bg-violet-500 rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Register</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="avatar" className="block mb-2 text-sm font-medium">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="coverImage" className="block mb-2 text-sm font-medium">
              Cover Image
            </label>
            <input
              type="file"
              id="coverImage"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700"
          disabled={loading}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
