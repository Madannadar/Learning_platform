import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log("Login Response:", response.data); // Log the response
      toast.success(response.data.message);

      // Store the JWT in local storage
      localStorage.setItem("token", response.data.token);

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error.message); // Log the error
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 font-poppins">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email/Username Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email or username"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Login
            </button>
          </div>

          {/* Link to Register Page */}
          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-purple-400 hover:text-purple-300">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;