import React from "react";
import ChatMessage from "./ChatMessage";
import { useSelector } from "react-redux";
import { isElementType } from "@testing-library/user-event/dist/utils";

export default function Chat() {
  const messages = useSelector((state: any) => state.messages);
  return (
    <div
      style={{
        height: "100%",
        overflowX: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {messages.map((element: any, index: number) => {
        return (
          <ChatMessage
            key={index}
            username={element.username}
            message={element.text}
            type={element.type}
          ></ChatMessage>
        );
      })}
    </div>
  );
}
