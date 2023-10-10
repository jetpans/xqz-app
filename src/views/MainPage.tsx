import React from "react";
import Chat from "../components/Chat";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import EntranceForm from "../components/EntranceForm";
export default function MainPage() {
  const username = useSelector((state: any) => state.username);
  const socket = useSelector((state: any) => state.socket);
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    //Logic to send message to server
    console.log("Sending message", {
      text: message,
      username: username,
      socketID: socket.id,
    });
    if (message.length > 0) {
      socket.emit("message", {
        text: message,
        username: username,
        socketID: socket.id,
      });
      setMessage("");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key == "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="main-page">
      {username === "" ? (
        <EntranceForm></EntranceForm>
      ) : (
        <div className="chat-container">
          <div className="chat">
            <Chat></Chat>
          </div>
          <div className="users"></div>
          <div className="text-input">
            <input
              required
              onKeyDown={handleKeyDown}
              type="text"
              className="input"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></input>
            <button className="submit" onClick={handleSendMessage}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
