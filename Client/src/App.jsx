import React from "react";
import StartingTest from "./Components/StartingTest";
import { Routes, Route } from "react-router-dom";
import Chat from "./Pages/Chat";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/StartingTest" element={<StartingTest />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
