import * as actions from "./socketActions.js";
import handleWebsocketMessage from "./handeWebSocketMessage.js";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.authenticated = false;
  }

  connect(host, port, password) {
    const url = `ws://${host}:${port}/remote`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      // actions.authenticate(password, this.sendMessage.bind(this));
      console.log("--------------------------");
      console.log("socket opened");
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleWebsocketMessage(message);
    };

    this.socket.onclose = () => {
      console.log("socket has been closed");
    };
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.log("socket is closed");
    }
  }

  closeConnection() {
    if (this.socket) this.socket.close();
  }
}
const webSocketService = new WebSocketService();
export default webSocketService;
