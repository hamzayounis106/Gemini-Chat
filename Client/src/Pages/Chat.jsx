import React, { useContext, useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import ChatArea from "../Components/ChatArea";
import Login from "./Login";
import ProfileBar from "../Components/ProfileBar";
import { UserContext } from "../App";

function Chat() {
  const user = useContext(UserContext);
  useEffect(() => {}, [user]);

  return (
    <>
      <div className="flex relative w-full h-screen justify-center bg-gradient-to-tl bg-[#0D1117]">
        {user ? <SideBar /> : null}
        <div className="hidden sm:flex"> {user ? <ProfileBar /> : null}</div>
        {!user ? <Login /> : null}

        <div className=" w-full sm:w-[70%] md:w-[100%]">
          {" "}
          <ChatArea />
        </div>
      </div>
    </>
  );
}

export default Chat;
