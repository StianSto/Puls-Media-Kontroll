import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { remoteApi } from "../utils/webSocketService";

export default function PreviousSlideBtn({
  style,
  iconColor = "black",
  iconSize,
}) {
  return (
    <>
      <TouchableOpacity onPress={remoteApi.previousSlide} style={style}>
        <FontAwesomeIcon
          icon={faBackward}
          size={iconSize}
          color={iconColor}
        ></FontAwesomeIcon>
      </TouchableOpacity>
    </>
  );
}
