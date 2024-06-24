import { useState } from "react";
import FormInput from "../components/FormInput";
import { useMasterStore } from "../stores/useMasterStore";
import { useShallow } from "zustand/react/shallow";
import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../types/sockets";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../App";

const ServerJoinPage = () => {
  const [serverURL, _setServerURL] = useState<string>("localhost:5000");
  const [username, _setUsername] = useState<string>("jetpans");

  const navigate = useNavigate();
  // get seters from the zustand store, equivaltent to redux dispatch but more
  // hook like
  const [setServerURL, setUsername] = useMasterStore(
    useShallow(state => [state.setServerURL, state.setUsername])
  );

  const handleClick = () => {
    // TODO: is this needed?
    setServerURL(serverURL);
    setUsername(username);

    // create a socket object with event types
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://" + serverURL
    );
    socket.connect();
    if (socket.connected === true) {
      console.log("socket connection established");
      navigate("/" + PATHS.PLAY);
    } else {
      console.log("sokcer establis fail");
    }
    console.log(socket);
  };

  return (
    <div className="flex justify-center pt-36">
      <div className="flex flex-col w-[500px] bg-white px-12 pb-14 rounded-lg shadow-lg">
        <h1 className="text-center text-4xl uppercase my-14 font-bold text-primary font-headings">
          join a server
        </h1>
        <div className="flex flex-col">
          <label htmlFor="serverURL" className="text-accent font-body text-md">
            Enter Server URL
          </label>
          <FormInput
            type="text"
            required
            value={serverURL}
            onChange={_setServerURL}
          />
        </div>
        <div className="flex flex-col mt-6">
          <label htmlFor="username" className="text-accent font-body text-md">
            Enter Username
          </label>
          <FormInput
            type="text"
            required
            value={username}
            onChange={_setUsername}
          />
        </div>
        <button
          className="bg-primary text-text p-2 mt-12 uppercase rounded-md font-heading hover:shadow-md"
          onClick={handleClick}
        >
          Join server
        </button>
      </div>
    </div>
  );
};

export default ServerJoinPage;
