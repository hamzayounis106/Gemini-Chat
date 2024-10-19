import { IoSend } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserMessageComponent from "./UserMessageComponent";
import ClientMessageComponent from "./ClientMessageComponent";
import { UserContext } from "../App";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
function ChatArea() {
  // Initialize navigation and state variables
  const navigate = useNavigate();
  const useChatContainer = useRef(null);
  const user = useContext(UserContext);
  const server = import.meta.env.VITE_SERVER_URL;

  const [rows, setRows] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]);
  const [anonymousUUID, setAnonymousUUID] = useState(null);
  const [buttonDisbaled, setButtonDisabled] = useState(true);
  const [uuid, setUUID] = useState(null);
  const [responseData, setResponseData] = useState([]);

  // Reset UUID when user changes
  useEffect(() => {
    setUUID(null);
  }, [user]);

  // Fetch history when UUID changes
  useEffect(() => {
    // Ignore if not on a session path
    if (!location.href.includes("/s")) {
      setHistory([]);
      return;
    }
    // Extract UUID from the path
    setUUID(location.pathname.replace("/s/", ""));
    // Fetch the first response and history
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

        setHistory(res.data.history);
      } catch (error) {
        // Handle 404 error if the session doesn't exist
        if (error.response.status === 404 && location.href.includes("/s")) {
          // window.location.href = "/";
        }
        console.log(error);
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    };
    getFirstResponse();
  }, [uuid, navigate]);

  // Scroll to the last message after history updates
  useEffect(() => {
    if (history && history.length > 0) {
      const id = "#historymodel" + (history.length - 1).toString();

      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [history]);

  // Scroll to the last message after response updates
  useEffect(() => {
    if (responseData && responseData.length > 0) {
      const id = "#model" + (responseData.length - 1).toString();

      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [responseData]);

  // Reset response data when navigating
  useEffect(() => {
    // Check if on session path
    if (location.href.includes("/s")) {
      setUUID(location.pathname.replace("/s/", ""));
    }
    setResponseData([]);
  }, [navigate, location]);

  // Create a new session
  const createSession = async () => {
    // Don't create a new session if one already exists
    if (uuid) {
      return;
    }
    try {
      // Send a POST request to create a new session
      const res = await axios.post(
        server + "/sessions/new-session",
        { prompt },
        {
          withCredentials: true,
        }
      );

      // Extract the session ID from the response
      const ses_uuid_revieved = res.data.sessionId;
      if (ses_uuid_revieved) {
        setUUID(ses_uuid_revieved);

        // Navigate to the new session path
        navigate(`/s/${ses_uuid_revieved}`, { replace: true });
        return ses_uuid_revieved;
      }
    } catch (error) {
      console.log("Error while creating new session on first prompt" + error);
      return null;
    }
  };

  // Create an anonymous session
  const createAnonymousSession = async () => {
    // Don't create a new anonymous session if one already exists
    if (anonymousUUID) {
      return;
    }
    try {
      // Send a POST request to create an anonymous session
      const res = await axios.post(
        server + "/sessions/create-anonymous-session",
        {},
        {
          withCredentials: true,
        }
      );
      const anon_res_id = res.data.anonTokenId;
      console.log("Annonymus session res: " + res);
      setAnonymousUUID(res.data.anonTokenId);
      return anon_res_id;
    } catch (error) {
      console.log("error crating Annonymus session  : " + error);
    }
  };

  // Handle sending the prompt
  const handlePromptSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Don't send empty prompt
    if (prompt.trim() === "") {
      setButtonDisabled(true);
      setLoading(false);
      return;
    }
    // Get session ID or anonymous ID
    let sessionId = uuid;
    let anonymousId = anonymousUUID;
    // Reset prompt input after sending
    setPrompt("");
    setRows(1);

    try {
      setButtonDisabled(true);

      // Create session if necessary
      if (user && !uuid) {
        sessionId = await createSession();
      } else if (!user && !anonymousUUID) {
        anonymousId = await createAnonymousSession();
      }

      // Send prompt to the server
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
      console.log("Prompt session res: " + res);
      // Update response data
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
      <div className="  max-w-[100%] lg:max-w-[100%] w-full h-full flex justify-end md:justify-center flex-col bg-transparent items-center">
        <div
          ref={useChatContainer}
          className=" h-[68%] lg:h-[75%] px-4 oldData overflow-y-auto overflow-hidden w-[95%] md:w-[80%] gap-3 flex flex-col relative"
        >
          {history &&
            history.map((msg, index) => {
              if (msg.role === "user") {
                return (
                  <UserMessageComponent
                    key={index + "History"}
                    id={"history" + msg.role + index}
                    message={msg.parts[0].text}
                  />
                );
              } else {
                return (
                  <ClientMessageComponent
                    key={index + "History"}
                    id={"history" + msg.role + index}
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
                  id={msg.role + index}
                  message={msg.message}
                />
              );
            } else if (msg.role === "model") {
              return (
                <ClientMessageComponent
                  key={index}
                  id={msg.role + index}
                  message={msg.message}
                />
              );
            }
          })}
        </div>

        <div className="h-[20%] w-full flex items-center  flex-col justify-center">
          <div className="flex items-start mb-5 w-[95%] md:w-[80%] ">
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
            <div
              id="input"
              className=" bg-[#19212c] border-none relative p-5 flex w-full overflow-hidden border rounded-xl"
            >
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
