import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();

  // State for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(response);
      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log("Login successful!");
        // Save the token in local storage or cookies
        // localStorage.setItem("token", data.token);
        // Redirect to dashboard upon successful login
        navigate("/home");
      } else {
        // Login failed
        console.error("Login failed:", data.error || response.statusText);
        toast.error(data.error || response.statusText);
        // You might want to display an error message to the user
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in:", error.message)
      // Handle any other errors that might occur during login
      // You might want to display an error message to the user
    }
  };

  return (
    <>
    <div><Toaster/></div>
      <div className="p-8 h-screen flex items-center justify-center bg-black">
        <div className="flex justify-center flex-col items-center lg:flex-row lg:items-center ">
          <div className="w-3/5 h-3/5">
            <img src="hero.png" alt="hero" />
          </div>
          <div className="flex flex-col gap-2 w-1/4 justify-center">
            <h2 className="text-6xl font-bold">Login</h2>
            <h6 className="text-lg pb-2">Welcome back!</h6>
            <div className=" bg-slate-800/45 rounded-xl flex flex-col gap-2 items-center justify-center h-3/4 py-8">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow w-48"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow w-48"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button className="btn btn-wide" onClick={handleLogin}>
                LOGIN
              </button>
              <img src="or.png" className="w-3/4 py-8" />
              <div className="flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Signup
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/forget");
                  }}
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
