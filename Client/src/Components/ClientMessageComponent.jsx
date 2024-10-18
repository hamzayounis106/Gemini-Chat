import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { FaRegCopy } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ClientMessageComponent({ message, id }) {
  const [copyIcon, setCopyIcon] = useState(<FaRegCopy />);

  // changing the copy icon once code is  copied
  const copyAlert = () => {
    setCopyIcon(<TiTick />);
    setTimeout(() => {
      setCopyIcon(<FaRegCopy />);
    }, 1000);
  };

  // Reference to the code block
  const codeRef = useRef(null);

  return (
    <>
      <div id={id} className="">
        <div className="flex items-end self-end justify-start max-w-[80vw] p-5 py-2 text-white rounded-lg ">
          <div className="markdown-body">
            <ReactMarkdown
              className={"w-full "}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div
                      className="relative overflow-x-auto "
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
              {message}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientMessageComponent;
