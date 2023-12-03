import { Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import webSocketService from "../../lib/utils/WebSocketService.js";
import { StyleSheet } from "react-native";
import theme from "../../lib/styles/theme.js";

const Remote = () => {
  useEffect(() => {
    // console.log(webSocketService.socket);
    // webSocketService.sendMessage({ action: "presentationCurrent" });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <Image
          style={styles.currentSlide}
          source={{ uri: "https://picsum.photos/200/300" }}
        />
        <Image
          style={styles.nextSlide}
          source={{ uri: "https://picsum.photos/200/300" }}
        />
      </View>
      <View style={styles.controls}></View>
    </View>
  );
};

export default Remote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    gap: 20,
    padding: 20,
    flexDirection: "row",
  },
  currentSlide: {
    flex: 1,
    aspectRatio: 16 / 9,
  },
  nextSlide: {
    flex: 1,
    aspectRatio: 16 / 9,
    opacity: 0.5,
  },
  controls: {
    flex: 1,
    background: "grey",
  },
});
