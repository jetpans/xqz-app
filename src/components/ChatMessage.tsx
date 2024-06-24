import { setMaxListeners } from "events";
import React, { useState } from "react";
import { setEmitFlags } from "typescript";
import { useSelector, useDispatch } from "react-redux";

import RegularChatMessage from "./RegularChatMessage";
import SpecialChatMessage from "./SpecialChatMessage";
export default function ChatMessage(props: any) {
  const dispatch = useDispatch();
  if (props.type === "special") {
    return (
      <SpecialChatMessage
        key={props.index}
        username={props.username}
        message={props.message}
        type={props.type}
      ></SpecialChatMessage>
    );
  }
  return (
    <RegularChatMessage
      key={props.index}
      username={props.username}
      message={props.message}
      type={props.type}
    ></RegularChatMessage>
  );
}
