import React, { useState } from "react";
import axios from "../../axios.js";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading.jsx";
import UserImage from '../../../public/noni.jpg'
const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
      <Loading isLoading={loading} />
      <div className="flex w-full max-w-4xl mx-[-2px] md:mx-0 rounded-xl border border-purple-800 shadow-lg overflow-hidden md:flex">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="mb-4 text-3xl font-bold text-violet-700">Create Account</h2>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full text-sm text-white"
            />
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="text-white w-full text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-36 py-2 text-violet-700 bg-gradient-to-br from-black via-gray-900 to-purple-900 hover:bg-violet-800 rounded transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <button
            onClick={() => navigate("/login")}
            disabled={loading}
            className="w-full py-2 ease-in-out duration-300  mt-3 text-violet-700  bg-gradient-to-br from-black via-gray-900 to-purple-900 hover:bg-violet-100 rounded transition"
          >
            Already have an account? Login
          </button>
        </div>

        {/* Right Panel (Gradient Visual Section) */}
        <div className="relative hidden w-1/2 p-10 bg-gradient-to-br from-purple-700 to-purple-500 md:flex flex-col justify-center items-center text-white mx-[-2px] md:mx-0">
          <img src={UserImage} alt="User" className="w-auto h-auto mb-6 rounded-lg shadow-lg" />
          <h2 className="text-4xl text-center font-bold mb-4">Welcome to the Family!</h2>
          <p className="text-center font-medium italic">
            Be a part of our journey. Get started by registering your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
