import * as actions from "./socketActions.js";
import handleWebsocketMessage from "./handeWebSocketMessage.js";

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
      actions.authenticate(password, this.sendMessage.bind(this));
      this.sendMessage({ action: "presentationCurrent" });
      this.sendMessage({ action: "presentationSlideIndex" });
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
