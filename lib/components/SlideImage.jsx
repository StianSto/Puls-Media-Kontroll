import { Image, Text, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import textBackgroundContrast from "../utils/color/textBackgroundContrast";
import toRgba from "../utils/color/toRgba";

export default function SlideImage({ offset = 0 }) {
  const slides = useSelector((state) => state.presentationCurrent);
  const slideIndex = useSelector((state) => state.presentationSlideIndex);

  i = slideIndex + offset;

  let background;
  let textColor;

  if (slides.length <= i) {
    background = "slategrey";
    textColor = "white";
  } else {
    background = toRgba(slides[i]?.groupColor);
    textColor = textBackgroundContrast(slides[i]?.groupColor);
  }

  return (
    <View style={[styles.container]}>
      <Image
        style={{ flex: 1 }}
        source={{
          uri: slides
            ? `data:image/jpeg;base64, ${slides[i]?.slideImage}`
            : null,
        }}
      />
      <Text
        style={{
          backgroundColor: background,
          fontSize: 16,
          color: textColor,
          paddingHorizontal: 8,
        }}
      >
        {i + 1}. {slides[i]?.groupName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
  },
});
