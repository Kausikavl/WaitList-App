import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import otpImg from "../utils/oottpp.png";
import axios from "axios";
import CountDown from "./CountDown";
import { toast } from "react-toastify";

const Otp = () => {
  const { token, setUser, user } = UserState();
  const validateOTPbutton = useRef();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const [userOTP, setUserOTP] = useState("");
  const [checkOTP, setCheckOTP] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleVerification = async (e) => {
    setVerifying(true);
    if (e) {
      e.preventDefault();
    }
    console.log("Sending OTP");

    let config = {
      headers: {
        Authorization: "Bearer " + token,
        withCredentials: true,
      },
    };

    try {
      const res = await axios.get("http://localhost:5000/user/get-otp", config);
      console.log(res);
    } catch (err) {
      console.log(err);
      setVerifying(false);
      setUserOTP("");
      setCheckOTP(false);
    }
  };

  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setCheckOTP(!checkOTP);
    validateOTPbutton.current.innerText = "VERIFYING OTP";
    if (userOTP) {
      console.log("Verifying OTP", userOTP);

      let config = {
        headers: {
          Authorization: "Bearer " + token,
          withCredentials: true,
        },
      };

      try {
        const res = await axios.post(
          "http://localhost:5000/user/verify-otp",
          { otp: userOTP },
          config
        );
        console.log(res.data);
        if (res.data && res.data.user) {
          let updatedUser = res.data.user;
          toast.success("Email verified");
          console.log(updatedUser);
          setUser(updatedUser);
          navigate("/leader-board");
        }
      } catch (err) {
        console.log(err);
        setVerifying(false);
        setUserOTP("");
        setCheckOTP(false);
        validateOTPbutton.current.innerText = "INVALID";
        navigate(-1);
      }
    }
  };

  return (
    <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto flex flex-col items-center justify-start bg-white p-8 rounded-lg shadow-xl mt-10">
      <img src={otpImg} alt="OTP Image" className="h-48 sm:h-40 mt-10 sm:mt-5" />
      <div className="w-full flex flex-col items-center p-5 gap-3">
        <p className="text-3xl font-bold text-gray-800">Verification</p>
        <p className="text-center font-normal text-gray-600">
          You will receive an OTP via email
        </p>

        {verifying ? (
          <CountDown
            resendOTP={handleVerification}
            setVerifying={setVerifying}
            verifying={verifying}
          />
        ) : (
          <p className="font-normal text-center text-gray-600">
            Expires in: <span className="font-bold">00:10</span>
          </p>
        )}

        <form className="w-full flex flex-col gap-5 mt-10">
          <input
            disabled={!verifying || checkOTP}
            placeholder="Enter OTP"
            type="password"
            className="w-full rounded-lg px-4 py-2 border-2 border-gray-300 focus:outline-none focus:border-yellow-500"
            onChange={(e) => setUserOTP(e.target.value)}
          />
          <button
            disabled={checkOTP || (!userOTP.length > 3 && verifying)}
            ref={validateOTPbutton}
            onClick={(e) => {
              verifying ? verifyOTP(e) : handleVerification(e);
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-lg px-5 py-2 rounded-lg focus:outline-none transition duration-300"
          >
            {verifying ? "VERIFYING OTP" : "GET OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
