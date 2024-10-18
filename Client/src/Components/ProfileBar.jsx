import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
function ProfileBar() {
  const server = import.meta.env.VITE_SERVER_URL;
  const user = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  //Handle dropdown visibilty Function
  const toggleDropdown = () => {
    // console.log(!dropdownVisible)
    setDropdownVisible(!dropdownVisible);
  };
  //Handle Plan upgrade Function
  const handleUpgradePlan = () => {
    setDropdownVisible(!dropdownVisible);
    alert("Coming soon!");
  };
  //Handle Logout Function
  const handleLogout = async () => {
    setDropdownVisible(!dropdownVisible);
    try {
      await axios.post(
        server + "/authRoutes/log-out",
        {},
        {
          withCredentials: true,
        }
      );
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex items-start justify-between sm:items-center sm:absolute sm:top-5 sm:right-5">
        <div className="relative">
          <img
            src={user.profile_image}
            className="w-[40px] rounded-full cursor-pointer"
            alt={user.name}
            onMouseEnter={toggleDropdown}
          />
          {dropdownVisible && (
            <div
            onClick={toggleDropdown}
              onMouseLeave={toggleDropdown}
              className="absolute left-11 sm:right-0 z-10 w-48 mt-2 bg-gray-700 rounded-md shadow-lg sm:top-0 top-[-40px]"
            >
              <ul className="py-1">
                {user.plan === "Free" ? (
                  <li
                    className="px-4 py-2 text-sm text-gray-100 cursor-pointer hover:bg-gray-500"
                    onClick={handleUpgradePlan}
                  >
                    Upgrade Plan
                  </li>
                ) : null}
                <li
                  className="px-4 py-2 text-sm text-gray-100 cursor-pointer hover:bg-gray-500"
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
