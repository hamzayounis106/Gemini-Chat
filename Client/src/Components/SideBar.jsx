import React from "react";
import ChatNamebar from "./ChatNamebar";
import { IoMdAddCircle } from "react-icons/io";
function SideBar() {
  return (
    <>
      <div className="max-w-[20%] w-full max-h-full bg-[#0c0f14] border-r-2 border-[#94a3b833] flex justify-between items-center pt-2 flex-col">
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
        <div className="flex oldData  overflow-hidden   hover:overflow-y-auto  h-[90%] flex-col items-center justify-start w-full gap-3 ">
          <ChatNamebar title={"Learn React Basics"} />
          <ChatNamebar title={"Build a Portfolio with HTML"} />
          <ChatNamebar title={"Advanced CSS Techniques"} />
          <ChatNamebar title={"Responsive Web Design"} />
          <ChatNamebar title={"JavaScript for Beginners"} />
          <ChatNamebar title={"Introduction to TypeScript"} />
          <ChatNamebar title={"Node.js for Back-End"} />
          <ChatNamebar title={"Create a Blog with Gatsby"} />
          <ChatNamebar title={"Understanding Flexbox Layout"} />
          <ChatNamebar title={"Mastering Grid Layout in CSS"} />
          <ChatNamebar title={"Learn React Basics"} />
          <ChatNamebar title={"Build a Portfolio with HTML"} />
          <ChatNamebar title={"Advanced CSS Techniques"} />
          <ChatNamebar title={"Responsive Web Design"} />
          <ChatNamebar title={"JavaScript for Beginners"} />
          <ChatNamebar title={"Introduction to TypeScript"} />
          <ChatNamebar title={"Node.js for Back-End"} />
          <ChatNamebar title={"Create a Blog with Gatsby"} />
          <ChatNamebar title={"Understanding Flexbox Layout"} />
          <ChatNamebar title={"Mastering Grid Layout in CSS"} />
        </div>
      </div>
    </>
  );
}

export default SideBar;
