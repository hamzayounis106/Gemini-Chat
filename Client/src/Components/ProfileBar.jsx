import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
function ProfileBar() {
  const user = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleUpgradePlan = () => {
    alert("Coming soon!");
  };
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/authRoutes/log-out",
        {},
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      <div className="absolute flex items-center justify-between top-5 right-5">
        <div className="relative">
          <img
            src={user.profile_image}
            className="w-[40px] rounded-full cursor-pointer"
            alt={user.name}
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
              <ul className="py-1">
                {user.plan === "Free" ? (
                  <li
                    className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                    onClick={handleUpgradePlan}
                  >
                    Upgrade Plan
                  </li>
                ) : null}
                <li
                  className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileBar;
