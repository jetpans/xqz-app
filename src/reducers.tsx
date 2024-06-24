let initialState = {
  messages: [],
  username: "",
  users: [],
  serverURL: "",
  socket: "",
};

export default function myReducer(state = initialState, action: any) {
  switch (action.type) {
    case "setMessages": {
      return { ...state, messages: action.payload[0].reverse() };
    }
    case "addMessage": {
      return { ...state, messages: [action.payload, ...state.messages] };
    }
    case "setServerURL": {
      return { ...state, serverURL: action.payload };
    }
    case "setUsername": {
      return { ...state, username: action.payload };
    }
    case "setSocket": {
      return { ...state, socket: action.payload };
    }
    default:
      return state;
  }
}
