import React from "react";

function ChatNamebar({ title }) {
  return (
    <>
  <div className="flex items-center overflow-y-clip overflow-x-hidden justify-between p-2 h-20  px-2 py-4 mt-2 w-[90%] hover:bg-zinc-700 cursor-pointer rounded-md">
  <div className="flex items-center justify-center gap-2">
    <p className="font-semibold text-[#D9D9D9] text-sm whitespace-nowrap overflow-hidden text-overflow-ellipsis">{title}</p>
  </div>
</div>
    </>
  );
}

export default ChatNamebar;
