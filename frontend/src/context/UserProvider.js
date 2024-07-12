import { useEffect, createContext, useContext, useState } from "react";
import { json, useNavigate } from "react-router-dom";

// Creating a context for user-related state management
const userContext = createContext();

// UserProvider component manages user state and provides it via context
const UserProvider = ({ children }) => {
  const [token, setToken] = useState(""); // State for JWT token
  const [user, setUser] = useState({}); // State for user information
  const [score, setScore] = useState([]); // State for user scores
  const { referral, setReferral } = useState("REFERRAL"); // State for referral information

  const navigate = useNavigate(); // Navigate hook for programmatic navigation

  // Effect hook to initialize user state from localStorage
  useEffect(() => {
    let userInfo = localStorage.getItem("signedJWT");
    userInfo = JSON.parse(userInfo);
    setToken(userInfo);

    // Redirect user based on token presence
    if (!token) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, []);

  // Providing state values through context
  return (
    <userContext.Provider
      value={{ token, setToken, user, setUser, score, setScore, referral, setReferral }}
    >
      {children}
    </userContext.Provider>
  );
};

// Custom hook to consume user context
export const UserState = () => {
  return useContext(userContext);
};

export default UserProvider;
