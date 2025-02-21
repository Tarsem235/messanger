import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage();
  const lastMsgRef = useRef();
  useEffect(() => {
  setTimeout(()=>{
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  },100);
  }, [messages]); 

  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(80vh - 8vh)" }}>
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} ref={lastMsgRef}>
              <Message message={message} />
            </div>
          ))
        ) : (
          <div>
            <p className="text-center text-lg mt-[24%] lg:[25%]">
              Say! hii to start the conversation
            </p>
          </div>
        )
      )}
    </div>
  );
}
export default Messages;
