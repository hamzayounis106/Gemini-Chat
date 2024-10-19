import React, { useEffect, useState } from "react";
// import StartingTest from "./Components/StartingTest";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Chat from "./Pages/Chat";
import { createContext } from "react";
import axios from "axios";

export const UserContext = createContext();
function App() {
  const navigate = useNavigate();
  const server = import.meta.env.VITE_SERVER_URL;
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const handShake = async () => {
      try {
        await axios.get(
          server + "/hand-shake",
          {},
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log("Handshake request error: " + error);
      }
    };
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          server + "/authRoutes/check-auth",
          {},
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setUser(res.data.sentUser);
        }
      } catch (error) {
        console.log(error);
        if (
          window.location.href.includes("/s") &&
          error?.response?.status === 403
        ) {
          window.location.assign("/");
        }
      }
    };
    handShake();
    checkAuth();
  }, [navigate, location]);

  return (
    <>
      <div>
        <UserContext.Provider value={user}>
          <Routes>
            {/* <Route path="/StartingTest" element={<StartingTest />} /> */}
            <Route path="/" element={<Chat />} />
            <Route path="/s/:sessionId" element={<Chat />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
