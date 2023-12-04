import handleWebsocketMessage from "./handeWebSocketMessage.js";

let baseUrl = "";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.authenticated = false;
    this.currentPresentation = [];
  }

  connect(host, port, password) {
    const url = `ws://${host}:${port}/remote`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      baseUrl = `http://${host}:${port}/v1/`;
      authenticate(password);
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(123);
      handleWebsocketMessage(message);
    };

    this.socket.onclose = () => {
      console.log("socket has been closed");
    };

    this.socket.onerror = (event) => {
      console.log("there was an error");
      console.log(event);
      alert(event);
    };
  }

  sendMessage(message) {
    if (!message) return;
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.log(message);
      console.log("socket is closed");
    }
  }

  closeConnection() {
    if (this.socket) this.socket.close();
  }
}
const webSocketService = new WebSocketService();
export default webSocketService;

// ACTIONS

export const webSocketActions = {
  authenticate,
  playlistRequestAll,
  presentationCurrent,
  presentationRequest,
  presentationSlideIndex,
};

function authenticate(password) {
  const authMessage = {
    action: "authenticate",
    protocol: 701,
    password,
  };
  webSocketService.sendMessage(authMessage);
}

function playlistRequestAll() {
  webSocketService.sendMessage({
    action: "playlistRequestAll",
  });
}

function presentationCurrent() {
  webSocketService.sendMessage({
    action: "presentationCurrent",
  });
}

function presentationRequest(presentationPath) {
  webSocketService.sendMessage({
    action: "presentationRequest",
    presentationPath,
  });
}

function presentationSlideIndex() {
  webSocketService.sendMessage({
    action: "presentationSlideIndex",
  });
}

// Remote Api
// some actions like triggerNext are not working, so the workaround is to utilize the api for this.

export const remoteApi = {
  nextSlide,
  previousSlide,
};

async function nextSlide() {
  try {
    const response = await fetch(baseUrl + "trigger/next");
  } catch (error) {
    console.log(error);
  }
}
async function previousSlide() {
  try {
    const response = await fetch(baseUrl + "trigger/previous");
  } catch (error) {
    console.log(error);
  }
}
