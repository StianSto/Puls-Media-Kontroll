import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlay, faHome } from "@fortawesome/free-solid-svg-icons";
import { Tabs } from "expo-router";

export default function Nav() {
  return (
    <View style={styles.nav}>
      <Tabs>
        <Tabs.Screen name="index" options={{ href: "/" }}>
          <FontAwesomeIcon icon={faHome} style={styles.icon} size={70} />
        </Tabs.Screen>
        <Tabs.Screen name="remote" options={{ href: "/remote/" }}>
          <FontAwesomeIcon icon={faPlay} style={styles.icon} size={70} />
        </Tabs.Screen>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    padding: 20,
    margin: 10,
  },
});
