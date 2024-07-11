import React, { useState, useEffect } from "react";
import axios from "axios";
import referralImg from "../utils/download.png";
import { UserState } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Referral = ({ socket }) => {
  const [referral, setReferral] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token, setUser } = UserState();

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);

    let config = {
      headers: {
        Authorization: "Bearer " + token,
        withCredentials: true,
      },
    };

    await axios
      .post(
        `http://localhost:5000/user/room/join`,
        { referral: referral },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          setUser(res.user);

          console.log(res.data);

          socket.emit("update-leaderboard", "send me the updated leaderboard");
          navigate(-2);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReferral = (e) => {
    setReferral(e.target.value);
  };

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  return (
    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto flex flex-col items-center justify-start bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 p-8 rounded-lg shadow-xl mt-10">
      <img className="h-48 sm:h-40 mt-10 sm:mt-5" src={referralImg} alt="Referral" />
      <div className="w-full flex flex-col items-center p-5 sm:p-2 gap-3">
        <form
          onSubmit={handleSubmission}
          className="flex flex-col w-full justify-start gap-5 items-center mt-10"
        >
          <label className="text-white text-lg font-semibold">
            Do you have a referral code?
          </label>
          <input
            placeholder="Enter a referral code"
            className="w-full rounded-lg px-4 py-2 border-2 border-white focus:outline-none focus:border-yellow-500"
            value={referral}
            onChange={handleReferral}
          />
          <div className="flex items-center gap-2 mt-2 w-full">
            <div className="w-1/2 h-0.5 bg-white/50"></div>
            <p className="text-white">OR</p>
            <div className="w-1/2 h-0.5 bg-white/50"></div>
          </div>

          <p className="text-white text-lg font-semibold">
            Continue without referral code
          </p>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 active:bg-yellow-400 text-white text-lg px-5 py-2 rounded-lg focus:outline-none transition duration-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Soon!!"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Referral;
