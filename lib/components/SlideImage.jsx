import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function SlideImage({ offset = 0 }) {
  const slides = useSelector((state) => state.presentationCurrent);
  const slideIndex = useSelector((state) => state.presentationSlideIndex);

  i = slideIndex + offset;

  return (
    <Image
      style={{ flex: 1 }}
      source={{
        uri: slides ? `data:image/jpeg;base64, ${slides[i]?.slideImage}` : null,
      }}
    />
  );
}
