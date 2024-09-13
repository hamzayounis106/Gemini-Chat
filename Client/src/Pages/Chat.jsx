import React from "react";
import SideBar from "../Components/SideBar";
import ChatArea from "../Components/ChatArea";
import Login from "./Login";



function Chat() {

  return (
    <>
      <div className="flex w-full h-screen justify-center bg-gradient-to-tl bg-[#0D1117]">
        <SideBar />
    
          <Login />
   
        <ChatArea />
      </div>
    </>
  );
}

export default Chat;
