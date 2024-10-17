import React from "react";
import ChatNamebar from "./ChatNamebar";
import { IoMdAddCircle } from "react-icons/io";
import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
function SideBar() {
  const user = useContext(UserContext);

  let chats = user.chats;
  console.log(chats);
  return (
    <>
      <div className="max-w-[20%] w-full max-h-full bg-[#0c0f14] border-r-2 border-[#94a3b833] flex justify-start items-center pt-2 flex-col gap-5">
        <Link to="/" className="flex items-center justify-center w-full ">
          <div className="flex items-center justify-center w-full ">
            <div className="flex items-center overflow-y-clip overflow-x-hidden justify-between p-2 pl-3  mt-2 w-[90%] bg-[#19212c] cursor-pointer rounded-md">
              <div className="flex items-center justify-between w-full gap-2 text-[#D9D9D9] text-2xl">
                <p className="font-semibold text-[#D9D9D9] text-lg  flex justify-between items-center gap-3">
                  New Chat
                </p>{" "}
                <IoMdAddCircle />
              </div>
            </div>
          </div>
        </Link>
        <div className="flex oldData  overflow-hidden   hover:overflow-y-auto  h-[85%] flex-col items-center justify-start w-full gap-2 ">
          {chats &&
         
            chats.map((chat, key) => {
              return (
                <ChatNamebar title={chat.title} key={key} uuid={chat.uuid} />
              );
            })}

          {/* <ChatNamebar title={"Mastering Grid Layout in CSS"} /> */}
        </div>
      </div>
    </>
  );
}

export default SideBar;
