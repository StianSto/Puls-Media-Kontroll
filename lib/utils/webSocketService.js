import handleWebsocketMessage from "./handeWebSocketMessage.js";

let baseUrl = "";

class WebSocketService {
  constructor() {
    this.socket = null;
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
      handleWebsocketMessage(message);
    };

    this.socket.onclose = () => {
      console.log("socket has been closed");
    };

    this.socket.onerror = (event) => {
      console.log("there was an error", event);
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
  libraryRequest,
};

/**
 * authenticates the user to use further actions for the websocket. includes all presentation children.
 * @param {String} password string
 */
function authenticate(password) {
  const authMessage = {
    action: "authenticate",
    protocol: 701,
    password,
  };
  webSocketService.sendMessage(authMessage);
}

/**
 * retreives information about all playlists
 */
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

/**
 * retrieves information about specified presentation. due to a bug, the server will return with "presentationCurrent"
 * @param {String} presentationPath path as either playlist idententifier or explicit path e.g  "0:0" or "C://.../presentation.pro"
 */
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

function libraryRequest() {
  webSocketService.sendMessage({
    action: "libraryRequest",
  });
}

// Remote Api
// some actions like triggerNext are not working, so the workaround is to utilize the api for this.
// an idea is to use presentationTriggerIndex and pass in values like "0:0" (playlistIndex:presentationIndex) and slideIndex

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
