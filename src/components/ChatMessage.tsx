import { setMaxListeners } from "events";
import React, { useState } from "react";
import { setEmitFlags } from "typescript";
import { useSelector, useDispatch } from "react-redux";

export default function ChatMessage(props: any) {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        border: "2px solid black",
        height: "10%",
        padding: "2px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "1.2rem",
        gap: "1rem",
      }}
    >
      <h3
        style={{
          color: "blue",
        }}
      >
        {props.username}
      </h3>
      <div>{props.message}</div>
    </div>
  );
}
