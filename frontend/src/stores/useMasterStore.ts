import { type Socket } from "socket.io-client";
import { create } from "zustand";

type User = {
  name: string;
};
interface MasterState {
  serverURL: string;
  username: string;
  messages: string[];
  users: User[];
  socket: Socket | null;

  setServerURL: (serverURL: string) => void;
  setUsername: (username: string) => void;
  addMessage: (message: string) => void;
}

export const useMasterStore = create<MasterState>()(set => ({
  serverURL: "",
  username: "",
  messages: [],
  users: [],
  socket: null,
  setServerURL: (serverURL: string) => set(() => ({ serverURL })),
  setUsername: (username: string) => set(() => ({ username })),
  addMessage(message) {
    set(state => ({ messages: [...state.messages, message] }));
  },
}));
