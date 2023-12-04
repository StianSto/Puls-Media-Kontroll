import { useEffect } from "react";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function SlideImage({ offset = 0 }) {
  const dispatch = useDispatch();

  const slides = useSelector((state) => state.presentationCurrent);
  const slideIndex = useSelector((state) => state.presentationSlideIndex);

  useEffect(() => {
    console.log("index", slideIndex);
  }, [dispatch]);

  return (
    <Image
      style={{ flex: 1 }}
      source={{
        uri:
          slides && slideIndex
            ? `data:image/jpeg;base64, ${
                slides[slideIndex + offset]?.slideImage
              }`
            : null,
      }}
    />
  );
}
