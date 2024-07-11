import React, { useEffect } from "react";
import iphone from "../utils/iphone.png";
import backgroundImage from "../utils/background.avif";
import axios from "axios";
import { UserState } from "../context/UserProvider";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const { token, setUser, user } = UserState();

  const navigate = useNavigate();

  const getInfo = async (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        withCredentials: true,
      },
    };

    axios
      .get("http://localhost:5000/user/get-info", config)
      .then((response) => {
        const { user } = response.data;
        setUser(user);
      })
      .catch((err) => {
        localStorage.removeItem("signedJWT");
        console.log("invalid jwt user not authenticated");
        navigate("/");
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getInfo(token);
    }, 100);
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <div
      className="flex flex-col justify-center items-center  bg-cover mt-10   bg-center"
    >
      <div className="flex justify-center items-center w-full h-[60vh]  ">
        <img
          src={iphone}
          className="max-w-full max-h-full bg-yellow-500  rounded-lg  "
          alt="iPhone"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        {user && (
          <div className="w-[90%] md:w-[70%] lg:w-[60%] text-center mt-10">
            {!user.joinedRoom && (
              <div>
                {/* <p className="text-lg sm:text-xl md:text-2xl text-[24px]">
                  <Link to={"/early-register"}>Register</Link>
                </p> */}
                <Link to={"/early-register"}>
                  <button className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md">
                    Register
                  </button>
                </Link>
              </div>
            )}
            {user.joinedRoom && (
              <div className="flex justify-center items-center h-screen mt-[-300px]">
                <p className="text-lg sm:text-xl md:text-2xl  cursor-pointer bg-clip-text ">
                  <button className="bg-orange-600 text-white text-lg font-bold font-lg h-18 w-38 rounded-lg p-5">
                    <Link to={"/leader-board"}>Leaderboard</Link>
                  </button>
                </p>
              </div>
            )}
            {user.winner && (
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600">
                <Link to={"/reedem-coupons"}>Coupons</Link>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;