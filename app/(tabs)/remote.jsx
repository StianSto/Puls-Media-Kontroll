import { View, Text } from "react-native";
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
          <PreviousSlideBtn style={styles.triggerBtn} iconSize={50} />
          <NextSlideBtn style={styles.triggerBtn} iconSize={50} />
        </View>
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
            style={{ color: "white", padding: 8, fontSize: 18, marginTop: 30 }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut commodi
            voluptatibus iusto consectetur maxime officiis voluptatum, illum ab
            quisquam dolore eius aliquid provident dolorem quae minus temporibus
            doloribus vero itaque est? Minus omnis nobis numquam aperiam placeat
            error soluta at, voluptas facere, ab consequatur eveniet quam
            incidunt rerum, possimus voluptatem.
          </Text>
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
  },
  triggers: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "flex-end",
  },
  triggerBtn: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 40,
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
