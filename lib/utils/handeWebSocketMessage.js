import { router } from "expo-router";

export default function handleWebsocketMessage(message) {
  if (!message) return;

  console.log(message);

  switch (message.action) {
    case "presentationCurrent":
      console.log(message);
    default:
      break;
  }
}
