import { IoSend } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserMessageComponent from "./UserMessageComponent";
import ClientMessageComponent from "./ClientMessageComponent";
import { UserContext } from "../App";
import { useContext } from "react";
import AILiveResponse from "./AILiveResponse";
import { useNavigate } from "react-router-dom";
function ChatArea() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const [history, setHistory] = useState([]);
  const [anonymousUUID, setAnonymousUUID] = useState(null);
  const useChatContainer = useRef(null);
  const [buttonDisbaled, setButtonDisabled] = useState(true);

  // const session_UUID = useContext(SesssionUUIDContext);
  const user = useContext(UserContext);
  const [uuid, setUUID] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const server = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    if (!location.href.includes("/s")) {
      console.log("no uuid to get history, returning");
      return;
    }
    setUUID(location.pathname.replace("/s/", ""));
    const getFirstResponse = async () => {
      setLoading(true);
      setButtonDisabled(true);

      try {
        const res = await axios.post(
          `${server}/geminiRoutes/getHistory?s=${uuid}`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log(res);
        setHistory(res.data.history);
      } catch (error) {
        if (error.response.status === 404 && location.href.includes("/s")) {
          // window.location.href = "/";
          console.log(404);
        }
        console.error("Error sending prompt:", error);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    };
    getFirstResponse();
    // if (uuid) {
    //   getFirstResponse();
    //   console.log(session_UUID);
    // } else {
    //   console.log("no session id being recieved");
    // }
  }, [uuid]);

  const scrollToBottom = () => {
    if (useChatContainer.current) {
      useChatContainer.current.scrollTop =
        useChatContainer.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [responseData, history]);
  useEffect(() => {
    if (location.href.includes("/s")) {
      setUUID(location.pathname.replace("/s/", ""));
    }
  }, []);
  const createSession = async () => {
    if (uuid) {
      return;
    }
    try {
      const res = await axios.post(
        server + "/sessions/new-session",
        {prompt},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      const ses_uuid_revieved = res.data.sessionId;
      if (ses_uuid_revieved) {
        console.log(ses_uuid_revieved);
        setUUID(ses_uuid_revieved);

        navigate(`/s/${ses_uuid_revieved}`, { replace: true });
        return ses_uuid_revieved;
      }
    } catch (error) {
      console.log("Error while creating new session on first prompt" + error);
      return null;
    }
  };
  const createAnonymousSession = async () => {
    if (anonymousUUID) {
      return;
    }
    try {
      const res = await axios.post(
        server + "/sessions/create-anonymous-session"
      );
      const anon_res_id = res.data.anonTokenId;
      // console.log("anon id res: " + anon_res_id);
      setAnonymousUUID(res.data.anonTokenId);
      return anon_res_id;
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  const handlePromptSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (prompt.trim() === "") {
      setButtonDisabled(true);
      setLoading(false);
      return;
    }
    let sessionId = uuid;
    let anonymousId = anonymousUUID;
    // Reset prompt input after sending the message
    setPrompt("");
    setRows(1);

    try {
      setButtonDisabled(true);

      // Check if user is authenticated, create session if necessary
      if (user && !uuid) {
        sessionId = await createSession();
      } else if (!user && !anonymousUUID) {
        anonymousId = await createAnonymousSession();
      }

      console.log("checking in sending prompt anonymousId :  " + anonymousId);
      console.log("checking in sending prompt sessionId :  " + sessionId);

      let res;
      if (anonymousId) {
        res = await axios.post(
          server + `/geminiRoutes/sendPrompt?a=${anonymousId}`,
          { prompt },
          { withCredentials: true }
        );
      } else {
        res = await axios.post(
          server +
            `/geminiRoutes/sendPrompt?s=${
              sessionId || location.pathname.replace("/s/", "")
            }`,
          { prompt },
          { withCredentials: true }
        );
      }

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
          {history &&
            history.map((msg, index) => {
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
