import React, { useContext, useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import ChatArea from "../Components/ChatArea";
import Login from "./Login";
import ProfileBar from "../Components/ProfileBar";
import { UserContext } from "../App";

function Chat() {
  const user = useContext(UserContext);
  useEffect(() => {
    console.log("chat refresh");
  },[user]);
  // console.log(user);
  return (
    <>
      <div className="flex relative w-full h-screen justify-center bg-gradient-to-tl bg-[#0D1117]">
        {user ? <SideBar /> : null}
        {user ? <ProfileBar /> : null}
        {!user ? <Login /> : null}

        <ChatArea />
      </div>
    </>
  );
}

export default Chat;
