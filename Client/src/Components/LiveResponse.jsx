//this is not being used anywhere currently :)
import React, { useEffect, useState } from "react";

function LiveResponse({ message, id }) {
  const [index, setIndex] = useState(0);
  const [dispayedMessage, setDisplayedMessage] = useState("");
  useEffect(() => {
    let parts;
    let delay;
    parts = message.split("\n");
    delay = 2;
    const interval = setInterval(() => {
      if (index > parts.legth) {
        setDisplayedMessage((prev) => prev + (index > 0 ? "" : parts[index]));
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [message, id, dispayedMessage]);
  return (
    <>
      <div id={id} className="flex justify-end userMessage">
        <div className="flex items-end self-end justify-end p-5 py-2 text-white rounded-lg w-max w- bg-[#2c394b]">
          {dispayedMessage}
        </div>
      </div>
    </>
  );
}

export default LiveResponse;
