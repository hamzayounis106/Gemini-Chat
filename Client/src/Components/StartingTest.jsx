//This component was just to test api, not required in final project

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula,vs, vscDarkPlus,atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "github-markdown-css/github-markdown.css";
import { vsDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import 'primer-markdown/build/build.css';
function StartingTest() {
  const [prompt, setPrompt] = useState("");
  const [resMessage, setResMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/geminiRoutes/test");
        console.log(res.data.history);
        setResMessage(res.data.text || ""); // Make sure it's a string
      } catch (error) {
        console.error("Error fetching data:", error);
        setResMessage("Error fetching data");
      }
    };

    // Uncomment this to fetch data on component mount
    fetchData();
  }, []);

  const handlePromptSend = async (e) => {
    e.preventDefault();
    setPrompt("");

    try {
      const res = await axios.post("/api/geminiRoutes/sendPrompt", { prompt });
      console.log(res.data);

      setResMessage(res.data.text || ""); // Make sure it's a string
    } catch (error) {
      console.error("Error sending prompt:", error);
      setResMessage("Error sending prompt: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-tl from-[#4CAF50] via-[#388E3C] to-[#2E7D32]">
      <div className="flex flex-col justify-center items-center w-[70%] p-8 rounded-lg bg-gray-100 shadow-md">
        {/* App Title */}
        <h2 className="mb-6 text-3xl font-bold text-center">My App</h2>

        {/* Response Message */}
        <div className="w-full p-4 mb-6 text-start">
        <div className="markdown-body">
        <ReactMarkdown className={"p-10"}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={atomDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {resMessage}
    </ReactMarkdown>
    </div>
        </div>

        {/* Prompt Form */}
        <form className="flex flex-col w-full gap-4" onSubmit={handlePromptSend}>
          <input
            type="text"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default StartingTest;
