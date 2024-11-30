"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear errors on change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", formData);
      console.log("Signup successful:", response.data);

      // Save user ID to local storage
      if (response.data?._id) {
        localStorage.setItem("userId", response.data._id);
      }

      alert("Signup successful!");
      router.push("/login");
    } catch (err: any) {
      console.error("Signup error:", err.response?.data || err.message);
      setError("Signup failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to your backend's Google OAuth endpoint
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative">
      {/* Background Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src="/logo.svg"
          alt="Valet Chat Logo"
          className="w-40 h-40 mb-4 opacity-10"
        />
        <h1 className="text-4xl font-bold text-white opacity-20 tracking-wide">
          Valet Chat
        </h1>
      </div>

      {/* Video Loading Animation */}
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <video
            src="/Loading.mp4"
            autoPlay
            loop
            muted
            className="w-48 h-48 object-cover"
          />
        </div>
      )}

      {/* Popup */}
      <div className="relative z-10 bg-white w-full max-w-md rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Create your account or continue with Google
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg text-gray-800 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg text-gray-800 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg text-gray-800 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring focus:ring-red-200 focus:outline-none"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M22.675 12.138c0-.817-.073-1.595-.21-2.33H12v4.41h5.916a5.084 5.084 0 01-2.208 3.34v2.774h3.564c2.086-1.922 3.278-4.756 3.278-8.194z" />
            <path d="M12 23c3.24 0 5.964-1.074 7.952-2.91l-3.564-2.774c-1.061.7-2.42 1.113-3.888 1.113-2.987 0-5.515-2.019-6.424-4.734H2.014v2.942A11.987 11.987 0 0012 23z" />
            <path d="M5.576 14.394a7.16 7.16 0 01-.363-2.394c0-.83.133-1.637.363-2.394V6.665H2.014A11.982 11.982 0 000 12c0 1.98.476 3.848 1.317 5.335l3.259-2.941z" />
            <path d="M12 4.77a6.501 6.501 0 014.604 1.799l3.443-3.442C17.958 1.246 15.233 0 12 0 7.423 0 3.593 2.74 1.317 6.665l3.259 2.942C6.485 6.894 9.013 4.77 12 4.77z" />
          </svg>
          Continue with Google
        </button>

        {/* Login Button */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-indigo-600 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
