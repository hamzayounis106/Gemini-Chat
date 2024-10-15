import React from "react";
import { Link } from "react-router-dom";
function ChatNamebar({ title, uuid }) {
  const getTrimmedTitle = (title) => {
    return title.length > 26 ? title.substring(0, 23) + "..." : title;
  };
  return (
    <>
      <Link
        title={title}
        to={`/s/${uuid}`}
        className="flex items-center justify-center w-full"
      >
        <div className={`flex items-center overflow-y-clip overflow-x-hidden justify-between p-2   px-2 py-2  w-[90%] hover:bg-zinc-700 cursor-pointer rounded-md ${location.href.includes(uuid) && ("!bg-zinc-700")}`}>
          <div className="flex items-center justify-center gap-2">
            <p className="font-semibold text-[#D9D9D9] text-sm whitespace-nowrap overflow-hidden text-overflow-ellipsis">
              {getTrimmedTitle(title)}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ChatNamebar;
