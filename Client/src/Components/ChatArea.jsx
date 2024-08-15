import React from "react";
import { IoSend } from "react-icons/io5";
function ChatArea() {
  return (
    <>
      <div className="max-w-[80%] w-full h-full flex justify-center flex-col bg-transparent items-center">
        <div className="h-[80%] w-full"></div>
        <div className="h-[20%] w-full flex items-center  justify-center">
          <form className="flex items-center w-[80%] ">
            <div className=" bg-[#2F2F2F] border-none relative p-5 flex w-full overflow-hidden border rounded-xl">
              <input
                className="w-[90%] text-white bg-transparent outline-none"
                type="text"
                placeholder="Enter your message......"
              />
              <button
                type="submit"
                className="absolute p-4 rounded-full right-5 top-2 bg-zinc-500"
              >
                <IoSend />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatArea;
