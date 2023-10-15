import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServerJoinPage from "./views/ServerJoinPage";
import ChatPage from "./views/ChatPage";

export enum PATHS {
  JOIN = "join",
  PLAY = "play",
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>hello home</h1>} />
        <Route path="/join" element={<ServerJoinPage />} />
        <Route path="/play" element={<ChatPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
