import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save user + token
      localStorage.setItem("user", JSON.stringify(data));

      // Update AuthContext
      dispatch({
        type: "LOGIN",
        payload: data,
      });

      // Go to home
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen bg-gray-300 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-10 flex flex-col justify-center items-center gap-4"
      >
        <h1 className="text-2xl font-bold">Login Form</h1>

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <label>Email:</label>

          <input
            className="border border-gray-300 rounded p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Password:</label>

          <input
            className="border border-gray-300 rounded p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;