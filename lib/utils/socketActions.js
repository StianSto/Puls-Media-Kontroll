export function authenticate(password, sendMessage) {
  const authMessage = {
    action: "authenticate",
    protocol: 701,
    password,
  };
  sendMessage(authMessage);
}

export function presentationCurrent(sendMessage) {
  sendMessage({
    action: "presentationCurrent",
  });
}

export function presentationRequest(presentationPath, sendMessage) {
  sendMessage({
    action: "presentationRequest",
    presentationPath,
  });
}

export function presentationSlideIndex(sendMessage) {
  sendMessage({
    action: "presentationSlideIndex",
  });
}

export function playlistRequestAll(sendMessage) {
  sendMessage({
    action: "playlistRequestAll",
  });
}
