import { View, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import theme from "../../lib/styles/theme.js";
import { useDispatch, useSelector } from "react-redux";
import SlideImage from "../../lib/components/SlideImage.jsx";
import NextSlideBtn from "../../lib/components/NextSlideBtn.jsx";
import PreviousSlideBtn from "../../lib/components/PreviousSlideBtn.jsx";

const Remote = () => {
  return (
    <View style={styles.container}>
      <View style={styles.slideContainer}>
        <View style={styles.currentSlide}>
          <SlideImage />
        </View>
        <View style={styles.nextSlide}>
          <SlideImage offset={1} />
        </View>
      </View>
      <View style={styles.controls}>
        <View style={styles.triggers}>
          <PreviousSlideBtn />
          <NextSlideBtn />
        </View>
      </View>
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
  triggers: {
    flexDirection: "row",
    gap: 20,
  },
});
