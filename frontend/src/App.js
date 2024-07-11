import { Route, Routes } from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";
import LeaderBoard from "./pages/LeaderBoard";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CouponsPage from "./pages/CouponsPage";
import Navbar from './components/Navbar'
import Admin from './components/Admin';
import AdminView from './components/AdminView'

import io from "socket.io-client";

const socket = io.connect('http://localhost:5000');

function App() {
  return (
    <div className=" h-[100vh] overflow-hidden  w-[100vw] box-border">
      <Navbar/>
      <Routes>
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/home"} element={<HomePage />} />
        <Route
          path={"/leader-board"}
          element={<LeaderBoard socket={socket} />}
        />
        <Route
          path={"/early-register"}
          element={<JoinRoom socket={socket} />}
        />
        <Route path={"/reedem-coupon"} element={<CouponsPage />} />
        <Route path={"/admin"} element={<Admin />} />
        <Route path={"/adminview"} element={<AdminView />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
