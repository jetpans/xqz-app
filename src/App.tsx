import React, { useEffect } from "react";
import MainPage from "./views/MainPage";
import "./styles/style.css";
import * as socketIO from "socket.io-client";
import getRoute from "./utils/utils";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const serverURL = useSelector((state: any) => state.serverURL);

  useEffect(() => {
    const socket = socketIO.connect(getRoute(serverURL, ""));
    dispatch({ type: "setSocket", payload: socket });
    console.log(
      "Trying to establish socket with this: ",
      getRoute(serverURL, "")
    );
    socket.on("singleMessage", (...args) => {
      console.log("This is args: ", args);
      console.log("And this is args[0]", args[0]);
      dispatch({ type: "addMessage", payload: args[0] });
    });
    // return () => {
    //   socket.off("singleMessage");
    // };
  }, [serverURL]);

  return (
    <div style={{ height: "100vh" }}>
      <MainPage></MainPage>
    </div>
  );
}

export default App;
