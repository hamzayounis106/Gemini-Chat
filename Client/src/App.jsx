import React, { useEffect, useState } from "react";
import StartingTest from "./Components/StartingTest";
import { Routes, Route, useNavigate } from "react-router-dom";
import Chat from "./Pages/Chat";
import { createContext } from "react";
import axios from "axios";
// export const SesssionUUIDContext = createContext();
export const UserContext = createContext();
function App() {
  // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // const [uuid, setUUID] = useState(null);
  const server = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          server + "/authRoutes/check-auth",
          {},
          {
            withCredentials: true,
          }
        );

        // console.log(res)
        if (res.status === 200) {
          setUser(res.data.sentUser);
        }
      } catch (error) {
        console.log(error);
        if (location.href.includes("/s") && error.response.status === 403) {
          window.location.href = "/";
        }
      }
    };
    checkAuth();

    console.log(user);
  }, []);

  return (
    <>
      <div>
        <UserContext.Provider value={user}>
          {/* <SesssionUUIDContext.Provider value={uuid}> */}
          <Routes>
            <Route path="/StartingTest" element={<StartingTest />} />
            <Route path="/" element={<Chat />} />
            <Route path="/s/:sessionId" element={<Chat />} />
          </Routes>
          {/* </SesssionUUIDContext.Provider> */}
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
