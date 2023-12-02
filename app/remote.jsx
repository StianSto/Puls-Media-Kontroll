import { Text, View } from "react-native";
import React, { Component, useEffect } from "react";
import webSocketService from "../lib/utils/WebSocketService.js";

const Remote = () => {
  useEffect(() => {
    console.log(webSocketService.socket);

    webSocketService.sendMessage({ action: "presentationCurrent" });
  }, []);
  return (
    <View>
      <Text>This is the remote</Text>
    </View>
  );
};

export default Remote;
