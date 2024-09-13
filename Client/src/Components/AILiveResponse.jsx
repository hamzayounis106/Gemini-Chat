import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FaRegCopy } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import {
  darcula,
  vs,
  vscDarkPlus,
  atomDark,
  a11yDark,
  dark,
  coldarkDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
// import "github-markdown-css/github-markdown.css";

function AILiveResponse({ message, id }) {
  const [index, setIndex] = useState(0);
  const [dispayedMessage, setDisplayedMessage] = useState("");
  const [copyIcon, setCopyIcon] = useState(<FaRegCopy />);
  const copyAlert = () => {
    setCopyIcon(<TiTick />);
    setTimeout(() => {
      setCopyIcon(<FaRegCopy />);
    }, 1000);
  };
  const codeRef = useRef(null); // Reference to the code block
  useEffect(() => {
    let parts;
    let delay;
    parts = message.split(" ");
    // console.log(parts);
    delay = 1
    const interval = setInterval(() => {
      if (index < parts.length) {
        setDisplayedMessage(
          (prev) => prev + (index > 0 ? " " : "") + parts[index]
        );
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, delay);
    // console.log(dispayedMessage);
    return () => clearInterval(interval);
  }, [message, id, dispayedMessage]);
  return (
    <>
      <div id={id} className="">
        <div className="flex items-end self-end justify-start max-w-[80vw] p-5 py-2 text-white rounded-lg ">
          <div className="markdown-body">
            <ReactMarkdown
              className={"min-w-full inline"}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div
                      className="relative min-w-full overflow-x-auto"
                      ref={codeRef} // Attach ref
                    >
                      <SyntaxHighlighter
                        style={coldarkDark}
                        className="oldData"
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                      <button
                        title="Copy to clipboard"
                        className="absolute p-2 text-gray-700 bg-gray-200 rounded-full top-3 right-4 hover:bg-gray-300 focus:outline-none"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            String(children).replace(/\n$/, "")
                          );
                          copyAlert();
                        }}
                      >
                        {copyIcon}
                      </button>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {dispayedMessage}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default AILiveResponse;
