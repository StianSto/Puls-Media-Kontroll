import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { remoteApi } from "../utils/WebSocketService";

export default function PreviousSlideBtn() {
  async function previousSlide() {}

  previousSlide = remoteApi.previousSlide;

  return (
    <>
      <TouchableOpacity onPress={previousSlide}>
        <FontAwesomeIcon
          icon={faBackward}
          size={60}
          color="white"
        ></FontAwesomeIcon>
      </TouchableOpacity>
    </>
  );
}
