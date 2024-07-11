import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import axios from "axios";

const Score = ({ socket }) => {
  const { user, score, setScore, token } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("updated-leaderboard", (leaderboard) => {
      let position = leaderboard.users;
      setScore(position);
    });
    getScore();
  }, []);

  const getScore = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
        withCredentials: true,
      },
    };

    axios
      .get(`http://localhost:5000/user/room/get`, config)
      .then((res) => {
        setScore(res.data.scores.users);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  const copy = async (text) => {
    await navigator.clipboard.writeText(text);
    console.log("copied", text);
    
  };


  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen gap-5 bg-yellow p-5">
      <p
        className="text-4xl mt-5 cursor-pointer text-black"
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-angle-left mr-3"></i>
        Leaderboard
      </p>
      <div className="flex flex-col items-center justify-between w-full mt-5 max-w-lg h-full">
        {/* Rank List */}
        <div className="flex h-3/4 w-11/12 bg-white rounded-lg shadow-xl overflow-y-auto">
          <ul className="w-full flex flex-col gap-2">
            {score.map((item) => (
              <li
                key={item._id}
                className={`${
                  item.user && item.user.email === user.email
                    ? "bg-red-500"
                    : "bg-green-400"
                } w-full px-5 py-3 rounded-lg flex items-center justify-between`}
              >
                <span className="font-bold text-lg">
                  #{item.position <= 0 ? 1 : item.position}
                </span>
                <span className="text-center">{item.user?.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Referral Link */}
        <div className="flex flex-col w-11/12 h-1/3 max-w-lg cursor-pointer mt-5">
          <div className="flex flex-col items-center justify-center border-3 rounded-lg shadow-xl bg-orange-700 p-5 text-white">
            {score
              .filter((item) => item.user && item.user.email === user.email)
              .map((item) => (
                <p
                  key={item._id}
                  className="text-lg font-bold"
                  onClick={() => copy(item.user.referralCode)}
                >
                  Your code{" "}
                  <span className="font-extrabold">
                    {item.user.referralCode}
                  </span>
                  <span>
                    <i className="fa-regular fa-clipboard mx-3"></i>
                  </span>
                </p>
              ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-5 text-white">
        <ul>
          <li className="text-lg font-semibold">
            Offer on the iPhone 15 for 1st position
          </li>
          <li className="text-lg font-semibold">
            Earn 1 position forward on each referral
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Score;
