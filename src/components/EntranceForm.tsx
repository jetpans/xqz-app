import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getRoute from "../utils/utils";
import { Dirent } from "fs";

export default function EntranceForm(props: any) {
  const dispatch = useDispatch();
  const usernameSelector = useSelector((state: any) => state.username);
  const [serverURL, setServerURL] = useState("localhost:5000");
  const [username, setUsername] = useState("jetpans");

  const handleClick = () => {
    console.log("Tryna submit!");
    console.log("Username before: ", usernameSelector);
    dispatch({ type: "setServerURL", payload: serverURL });
    dispatch({ type: "setUsername", payload: username });
    console.log("Username after: ", usernameSelector);
    // fetch(getRoute(serverURL, "/setUsername/" + username));
  };
  return (
    <div
      style={{
        fontSize: "2rem",
        backgroundColor: "aquamarine",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
        width: "50%",
        gap: "10px",
      }}
    >
      <label htmlFor="serverURL">Enter Server URL</label>
      <input
        required
        style={{ fontSize: "inherit" }}
        name="serverURL"
        type="text"
        value={serverURL}
        onChange={(e) => {
          setServerURL(e.target.value);
        }}
      />
      <label htmlFor="username">Enter Username</label>
      <input
        type="text"
        required
        style={{ fontSize: "inherit" }}
        value={username}
        name="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <button style={{ fontSize: "inherit" }} onClick={() => handleClick()}>
        Submit
      </button>
    </div>
  );
}
