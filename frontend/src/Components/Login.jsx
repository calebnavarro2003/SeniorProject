import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (email === "user@example.com" && password === "password123") {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials.");
    }
  };

  const googleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google'
  };

  return (
    <div className="flex flex-col space-y-8 items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <button className="bg-white py-2 px-4 rounded" onClick={googleLogin}>Login with Google</button>
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Welcome Back</h2>
        {error && <p className="text-red-400 text-sm text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
