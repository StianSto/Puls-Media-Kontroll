import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import theme from "../../lib/styles/theme.js";
import SlideImage from "../../lib/components/SlideImage.jsx";
import NextSlideBtn from "../../lib/components/NextSlideBtn.jsx";
import PreviousSlideBtn from "../../lib/components/PreviousSlideBtn.jsx";
import { useSelector } from "react-redux";

const Remote = () => {
  const slides = useSelector((state) => state.presentationCurrent);
  const slideIndex = useSelector((state) => state.presentationSlideIndex);

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
        <View style={styles.textDisplay}>
          <Text
            style={{
              color: "white",
              fontSize: 24,
              position: "absolute",
              top: -20,
              left: 20,
              backgroundColor: theme.background,
              paddingHorizontal: 20,
            }}
          >
            Slide Text
          </Text>
          <Text
            style={{ color: "white", padding: 8, fontSize: 38, marginTop: 30 }}
          >
            {slides[slideIndex]?.slideText}
          </Text>
        </View>

        <View style={styles.triggers}>
          <PreviousSlideBtn style={styles.triggerBtn} iconSize={70} />
          <NextSlideBtn style={styles.triggerBtn} iconSize={70} />
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
    padding: 20,
    gap: 10,
    flexDirection: "row",
  },
  triggers: {
    // flexDirection: "row",
    gap: 20,
    alignSelf: "flex-end",
  },
  triggerBtn: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  textDisplay: {
    flex: 1,
    background: "rgba(255,255,255, 0.3)",
    padding: 16,
    position: "relative",
    borderColor: "white",
    borderWidth: 2,
  },
});
