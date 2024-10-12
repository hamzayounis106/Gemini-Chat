import React, { useEffect, useState } from "react";
import StartingTest from "./Components/StartingTest";
import { Routes, Route, useNavigate } from "react-router-dom";
import Chat from "./Pages/Chat";
import { createContext } from "react";
import axios from "axios";
export const SesssionUUIDContext = createContext();
export const UserContext = createContext();
function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [uuid, setUUID] = useState(null);
  const server = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    if (location.href.includes("/s")) {
      // console.log(location.pathname.replace("/s/",""))
      setUUID(location.pathname.replace("/s/",""))
      return;
    }
    const createSession = async () => {
      try {
        const res = await axios.get(server + "/new-session");
        const session_UUID = res.data.sessionId;
        if (session_UUID) {
          setUUID(session_UUID);
          navigate(`/s/${session_UUID}`, { replace: true });
        }
      } catch (error) {}
    };
    createSession();
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
      }
    };
    checkAuth();
    console.log(user);
  }, []);

  return (
    <>
      <div>
        <UserContext.Provider value={user}>
          <SesssionUUIDContext.Provider value={uuid}>
            <Routes>
              <Route path="/StartingTest" element={<StartingTest />} />
              <Route path="/" element={<Chat />} />
              <Route path="/s/:sessionId" element={<Chat />} />
            </Routes>
          </SesssionUUIDContext.Provider>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
