import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";
import loginBg from "../utils/new-login.png";
import backgroundImage from "../utils/background.avif";

const LoginPage = () => {
  const [login, setLogin] = useState(true);
  const handleLogin = () => {
    setLogin(!login);
  };
  return (
    <>
      <div
        className=" h-[100vh] w-[100vw] flex items-center justify-center sm:p-5 md:p-10"
        // style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
      >
        <div
          className="p-5 sm:p-6 md:p-2 flex items-center gap-0 justify-center h-[90%] w-[100%] max-w-5xl rounded-lg"
        >
          <div className="relative w-[100%] md:w-1/2 h-full flex items-center justify-center">
            <img className="" src={loginBg} style={{ objectFit: 'cover' }} />
          </div>
          <div className="w-[100%] md:w-[50%] rounded-xl h-full flex items-center justify-center ">
            {login ? (
              <Login handleLogin={handleLogin} />
            ) : (
              <Register handleLogin={handleLogin} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
