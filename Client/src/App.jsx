import React, { useEffect, useState } from "react";
import StartingTest from "./Components/StartingTest";
import { Routes, Route } from "react-router-dom";
import Chat from "./Pages/Chat";
import { createContext } from "react";
import axios from "axios";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/authRoutes/check-auth",
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
          <Routes>
            <Route path="/StartingTest" element={<StartingTest />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
