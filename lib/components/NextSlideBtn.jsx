import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { remoteApi } from "../utils/webSocketService";

export default function NextSlideBtn({ style, iconColor = "black", iconSize }) {
  return (
    <>
      <TouchableOpacity onPress={remoteApi.nextSlide} style={style}>
        <FontAwesomeIcon
          icon={faForward}
          size={iconSize}
          color={iconColor}
        ></FontAwesomeIcon>
      </TouchableOpacity>
    </>
  );
}
