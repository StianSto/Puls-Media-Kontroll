import React from "react";
import { Tabs } from "expo-router/tabs";
import theme from "../../lib/styles/theme";
import { StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faPlay, fa } from "@fortawesome/free-solid-svg-icons";
import { StatusBar } from "expo-status-bar";

export default () => {
  return (
    <>
      <Tabs
        sceneContainerStyle={{ backgroundColor: theme.background }}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.bar,
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarActiveTintColor: theme.secondary,
          tabBarIconStyle: { marginRight: 10 },
          tabBarLabelStyle: { fontSize: 16 },
          tabBarIcon: ({ color }) => {
            let iconName;

            switch (route.name) {
              case "home":
                iconName = faHome;
                break;
              case "remote":
                iconName = faPlay;
                break;

              default:
                break;
            }

            return <FontAwesomeIcon icon={iconName} size={40} color={color} />;
          },
        })}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="remote" />
      </Tabs>
      <StatusBar hidden style="inverted" />
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    backgroundColor: theme.primaryDark,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
});
