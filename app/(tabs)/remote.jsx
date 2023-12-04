import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import webSocketService from "../../lib/utils/WebSocketService.js";
import { StyleSheet } from "react-native";
import theme from "../../lib/styles/theme.js";
import { useDispatch, useSelector } from "react-redux";
import SlideImage from "../../lib/components/SlideImage.jsx";

const Remote = () => {
  const slides = useSelector((state) => state.presentationCurrent);
  const slideIndex = useSelector((state) => state.presentationSlideIndex);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   refresh();
  // }, [dispatch]);

  function refresh() {
    webSocketService.sendMessage({
      action: "presentationSlideIndex",
    });
    webSocketService.sendMessage({
      action: "presentationCurrent",
      presentationSlideQuality: 100,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <View style={styles.currentSlide}>
          <SlideImage />
        </View>
        <Image
          style={styles.nextSlide}
          source={{
            uri:
              slides && slideIndex + 1 <= slides.length
                ? `data:image/jpeg;base64, ${
                    slides[slideIndex + 1]?.slideImage
                  }`
                : null,
          }}
        />
      </View>
      <View style={styles.controls}></View>
      <TouchableOpacity onPress={refresh}>
        <Text style={{ fontSize: 30, color: "white" }}>Refresh</Text>
      </TouchableOpacity>
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
