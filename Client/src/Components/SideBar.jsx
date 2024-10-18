import React,{useState,useEffect} from "react";
import ChatNamebar from "./ChatNamebar";
import { IoMdAddCircle } from "react-icons/io";
import { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function SideBar() {
  const navigate = useNavigate()
  const server = import.meta.env.VITE_SERVER_URL;
  const user = useContext(UserContext);
  const [chats, setChats] = useState(user.chats || []);
  useEffect(() => {
    setChats(user.chats);
  }, [user.chats]);
  const handleChatDelete = async (uuid) => {
    try {
      const res = await axios.post(
        server + "/geminiRoutes/delete-chat",
        { uuid },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        navigate("/")
        setChats((prevChats) => prevChats.filter((chat) => chat.uuid !== uuid));
        
      }
      console.log("Deleting Chat response : " + res);
    } catch (error) {
      console.log("Deleting Chat response error : " + error);
    }
  };
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
                <ChatNamebar
                  deleteChat={handleChatDelete}
                  title={chat.title}
                  key={key}
                  uuid={chat.uuid}
                />
              );
            })}

          {/* <ChatNamebar title={"Mastering Grid Layout in CSS"} /> */}
        </div>
      </div>
    </>
  );
}

export default SideBar;
