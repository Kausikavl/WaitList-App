import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const Coupons = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti explosion when the component mounts
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-full w-full py-10 bg-purple-50">
      <p
        className="text-4xl mb-10 mt-5 cursor-pointer text-purple-800"
        onClick={() => {
          navigate(-1);
        }}
      >
        <span>
          <i className="fa-solid fa-angle-left"></i>
        </span>{" "}
        <strong>Your Coupons</strong>
      </p>
      <p className="text-3xl text-center text-red-600 mb-10">Congratulations!</p>
      <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 h-[500px] w-[300px] flex flex-col rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
        <div className="flex flex-col items-center justify-center h-[60%] w-full text-yellow-400">
          <p className="text-5xl font-extrabold">25% OFF</p>
          <p className="text-3xl mt-5">IPHONE 14</p>
        </div>
        <div className="h-[10%] w-full relative flex items-center">
          <div className="bg-white rounded-full h-full w-[12%] absolute left-[-6%] shadow-lg"></div>
          <div className="w-full border-dashed border-2 border-white shadow-lg"></div>
          <div className="bg-white rounded-full h-full w-[12%] absolute right-[-6%] shadow-lg"></div>
        </div>
        <div className="h-[30%] w-full flex items-center justify-center">
          <button className="bg-yellow-400 text-white font-bold px-8 py-3 rounded-lg border-2 border-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 transition duration-300">
            Redeem Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
