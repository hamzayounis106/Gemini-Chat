import React from "react";

function ProfileBar({ pfp, name, modle }) {
  return (
    <>
      <div className="flex items-center justify-between p-2 px-1 py-2 mb-4 mt-4 border-[#94a3b833]  border-t-2 pt-4 w-[90%]">
        <div className="flex items-center justify-between gap-2 ">
          <img src="/Pfp.webp" className="w-[40px] rounded-full" alt={name} />
          <p className="font-semibold text-[#D9D9D9] text-lg">{name}</p>
        </div>
        {modle === "Pro" && (
          <div className="bg-[#F6E6A6] p-2 flex items-center rounded-md h-7 w-12 justify-center font-semibold">
            <p className="text-[#8D7324] ">Pro</p>
          </div>
        )}
        {modle === "Free" && (
          <div className="bg-[#1f9022] p-2 flex items-center rounded-md h-7 w-12 justify-center font-semibold">
            <p className="text-[#ffffff] ">Free</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileBar;
