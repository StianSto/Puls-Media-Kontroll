import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { remoteApi } from "../utils/webSocketService";

export default function NextSlideBtn() {
  async function nextSlide() {}

  nextSlide = remoteApi.nextSlide;

  return (
    <>
      <TouchableOpacity onPress={nextSlide}>
        <FontAwesomeIcon
          icon={faForward}
          size={60}
          color="white"
        ></FontAwesomeIcon>
      </TouchableOpacity>
    </>
  );
}
