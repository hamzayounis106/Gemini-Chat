import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function ChatNamebar({ title, uuid, deleteChat }) {
  // limiting chat title to specific number of characters
  const getTrimmedTitle = (title) => {
    return title.length > 26 ? title.substring(0, 23) + "..." : title;
  };

  return (
    <>
      <div className="relative flex items-center justify-center w-full namePlate group">
        <MdDelete
          onClick={() => deleteChat(uuid)}
          title="Delete CHat"
          className="hidden cursor-pointer  absolute text-xl text-[#8e9db9] top-2 right-5 z-[300] group-hover:block"
        />
        <Link
          title={title}
          to={`/s/${uuid}`}
          className="relative flex items-center justify-center w-full"
        >
          <div
            className={`flex items-center overflow-y-clip overflow-x-hidden justify-between p-2   px-2 py-2  w-[90%] z-[200] hover:bg-zinc-700 cursor-pointer rounded-md ${
              location.href.includes(uuid) && "!bg-zinc-700"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <p className="font-semibold text-[#D9D9D9] text-sm whitespace-nowrap overflow-hidden text-overflow-ellipsis">
                {getTrimmedTitle(title)}
              </p>
            </div>
          </div>
        </Link>{" "}
      </div>
    </>
  );
}

export default ChatNamebar;
