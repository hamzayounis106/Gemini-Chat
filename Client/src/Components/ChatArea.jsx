import { IoSend } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserMessageComponent from "./UserMessageComponent";
import ClientMessageComponent from "./ClientMessageComponent";

import AILiveResponse from "./AILiveResponse";
function ChatArea() {
  const [rows, setRows] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const [history, setHistory] = useState([]);

  const useChatContainer = useRef(null);
  const [buttonDisbaled, setButtonDisabled] = useState(true);

  const [responseData, setResponseData] = useState([]);
  const server = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    const getFirstResponse = async () => {
      setLoading(true);
      setButtonDisabled(true);
      try {
        const res = await axios.get(server + "/geminiRoutes/getHistory");

        setHistory(res.data.history);
      } catch (error) {
        console.error("Error sending prompt:", error);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    };
    getFirstResponse();
  }, []);
  const scrollToBottom = () => {
    if (useChatContainer.current) {
      useChatContainer.current.scrollTop =
        useChatContainer.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [responseData, history]);
  const handlePromptSend = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (prompt.trim() === "") {
      setButtonDisabled(true);

      return;
    }
    setPrompt("");
    setRows(1);

    try {
      setButtonDisabled(true);
      const res = await axios.post(server + "/geminiRoutes/sendPrompt", {
        prompt,
      });
      console.log(res.data);
      setResponseData((prevData) => [...prevData, ...res.data]);
    } catch (error) {
      console.error("Error sending prompt:", error);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <>
      <div className="max-w-[80%] w-full h-full flex justify-center flex-col bg-transparent items-center">
        <div
          ref={useChatContainer}
          className="h-[75%] px-4 oldData overflow-y-auto overflow-hidden w-[80%] gap-3 flex flex-col relative"
        >
          {history.map((msg, index) => {
            if (msg.role === "user") {
              return (
                <UserMessageComponent
                  key={index + "History"}
                  id={msg.role + " " + index + "History"}
                  message={msg.parts[0].text}
                />
              );
            } else {
              return (
                <ClientMessageComponent
                  key={index + "History"}
                  id={msg.role + " " + index + "History"}
                  message={msg.parts[0].text}
                />
              );
            }
          })}
          {responseData.map((msg, index) => {
            if (msg.role === "user") {
              return (
                <UserMessageComponent
                  key={index}
                  id={msg.role + " " + index}
                  message={msg.message}
                />
              );
            } else if (msg.role === "model") {
              return (
                <ClientMessageComponent
                  key={index}
                  id={msg.role + " " + index}
                  message={msg.message}
                />
              );
            }
          })}
        </div>

        <div className="h-[20%] w-full flex items-center  flex-col justify-center">
          <div className="flex items-start mb-5 w-[80%] ">
            {loading && (
              <>
                <div className="loader"></div>
              </>
            )}
          </div>
          <form
            onSubmit={handlePromptSend}
            className="flex items-center w-[80%] "
          >
            <div className=" bg-[#19212c] border-none relative p-5 flex w-full overflow-hidden border rounded-xl">
              <textarea
                dir="auto"
                rows={rows}
                className=" oldData w-[90%] text-white  outline-none   m-0 resize-none border-0 bg-transparent px-0 text-token-text-primary focus:ring-0 focus-visible:ring-0  max-h-14"
                value={prompt}
                type="text"
                placeholder="Enter your message......"
                onChange={(e) => {
                  setPrompt(e.target.value);
                  if (e.target.value.trim() == "") {
                    setButtonDisabled(true);
                  } else {
                    setButtonDisabled(false);
                  }
                }}
                onInput={(e) => {
                  if (rows !== 3) {
                    setRows(e.target.value.split("\n").length);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handlePromptSend(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={buttonDisbaled}
                className={`absolute p-4 rounded-full right-5 top-2 bg-zinc-500 disabled:text-zinc-400`}
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
