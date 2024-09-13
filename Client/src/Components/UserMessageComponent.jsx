import React from "react";

function UserMessageComponent({ message,id }) {
  return (
    <>
      <div id={id} className="flex justify-end userMessage">
        <div className="flex items-end self-end justify-end p-5 py-2 text-white rounded-lg w-max w- bg-[#2c394b]">
          {message}
        </div>
      </div>
    </>
  );
}

export default UserMessageComponent;
