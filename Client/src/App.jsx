import React, { useEffect } from "react";
import StartingTest from "./Components/StartingTest";
import { Routes, Route } from "react-router-dom";
import Chat from "./Pages/Chat";
import { createContext } from "react";

export const GoogleApiContext = createContext("");
function App() {
  const [api, setApi] = React.useState("");
  useEffect(() => {
    setApi(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  },[]);

  return (
    <GoogleApiContext.Provider value={api}>
      <div>
        <Routes>
          <Route path="/StartingTest" element={<StartingTest />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </div>
    </GoogleApiContext.Provider>
  );
}

export default App;
