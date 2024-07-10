import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = ({ handleLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      return toast.error("Confirm password incorrect");
    }
    setLoading(true);
    const user = { name, email, password };

    await axios
      .post(`http://localhost:5000/auth/register`, { user })
      .then((response) => {
        if (response.status !== 200) {
          toast.error(response.data.message);
        } else {
          toast.success("Registered successfully");
          handleLogin();
        }
      })
      .catch((error) => {
        toast.error("Registration failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInput = (e, changeState) => {
    changeState(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-90% max-w-md p-6 bg-white shadow-2xl rounded-lg">
        <h3 className="text-3xl font-bold text-center mb-6">Create an Account</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <div className="w-1/3 border-t border-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">OR</p>
          <div className="w-1/3 border-t border-gray-300"></div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Have an account?{" "}
          <button
            onClick={handleLogin}
            className="text-orange-500 hover:text-orange-600"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
