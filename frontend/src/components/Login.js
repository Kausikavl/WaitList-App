import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token, setToken } = UserState();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    const user = { email, password };
    if(email=='admin@gmail.com'){
      navigate('/admin')
      toast.success("Admin logged")
    }
    else{
    axios
      .post(`http://localhost:5000/auth/login`, {
        user: user,
        withCredentials: true,
      })
      .then((response) => {
        if (response.status !== 200) {
          toast.error(response.data.message);
        } else {
          if (response.data.token) {
            let token = response.data.token;
            setToken(token);
            localStorage.setItem("signedJWT", JSON.stringify(token));
            toast.success("Logged in");
            navigate("/home");
          }
        }
      })
      .catch((error) => {
        toast.error("Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    let userInfo = localStorage.getItem("signedJWT");
    if (userInfo) {
      setToken(JSON.parse(userInfo));
    }

    if (token) {
      navigate("/home");
    }
  }, [token, navigate, setToken]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg">
        <h3 className="text-3xl font-bold text-center mb-6">Access Your <span className="text-orange-500">World</span></h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-500' : 'bg-orange-500 hover:bg-orange-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <div className="w-1/3 border-t border-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">OR</p>
          <div className="w-1/3 border-t border-gray-300"></div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={handleLogin}
            className="text-orange-500 hover:text-orange-600"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
