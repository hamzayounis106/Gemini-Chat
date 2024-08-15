import React from "react";
import SideBar from "../Components/SideBar";
import ChatArea from "../Components/ChatArea";
function Chat() {
  return (
    <>
<div className="flex w-full h-screen bg-gradient-to-tl bg-zinc-800">
  <SideBar />
  <ChatArea />
</div>

    </>
  );
}

export default Chat;
