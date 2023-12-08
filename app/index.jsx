// import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import webSocketService, {
  webSocketActions,
} from "../lib/utils/webSocketService.js";
import theme from "../lib/styles/theme.js";
import * as SecureStore from "expo-secure-store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result ? result : "";
}

export default function App() {
  const [host, setHost] = useState();
  const [port, setPort] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState([]);
  const [status, setStatus] = useState();

  // validate input fields
  function validate() {
    setError();
    setStatus();

    let errMsg = [];
    if (!host) errMsg.push("host is missing");
    if (!port) errMsg.push("port is missing");

    setError(errMsg);
  }

  function handleConnect() {
    validate();
    if (error.length > 0) return;

    setStatus("Connecting");
    webSocketService.connect(host, port, password);

    webSocketService.socket.onerror = (event) => {
      setError(
        "Failed to connect. Please check that you entered the correct IP address and host."
      );
      setStatus();
    };

    setStatus("Authenticating");

    webSocketService.socket.addEventListener(
      "message",
      async (event) => {
        const data = JSON.parse(event.data);
        if (data.action !== "authenticate") return;

        if (data.authenticated === 0) {
          setStatus();
          setError(data.error);
        } else if (data.authenticated === 1) {
          await save("host", host);
          await save("port", port);
          await save("password", password);

          setStatus("Syncing");

          // initial sync up
          webSocketActions.presentationCurrent();
          webSocketActions.presentationSlideIndex();
          webSocketActions.libraryRequest();

          router.replace("/(tabs)/remote");
        }
      },
      { once: true }
    );
  }

  useEffect(() => {
    (async () => {
      const getHost = await getValueFor("host");
      const getPort = await getValueFor("port");
      const getPassword = await getValueFor("password");
      setHost(getHost);
      setPort(getPort);
      setPassword(getPassword);
    })();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
        <Text style={styles.title}>ProPresenter Live View</Text>
        <View style={styles.container}>
          <View style={styles.connectForm}>
            <TextInput
              style={[styles.textInput, host === false && styles.errorInput]}
              value={host}
              onChangeText={setHost}
              onSubmitEditing={() => {
                this.secondInput.focus();
              }}
              blurOnSubmit={false}
              placeholder="Ip Address (eg. 127.0.0.1)"
            />

            <TextInput
              style={[styles.textInput, port === false && styles.errorInput]}
              value={port}
              ref={(input) => (this.secondInput = input)}
              onChangeText={setPort}
              onSubmitEditing={() => {
                this.thirdInput.focus();
              }}
              blurOnSubmit={false}
              placeholder="Port (eg.1025)"
            />

            <TextInput
              value={password}
              onChangeText={setPassword}
              onEndEditing={validate}
              placeholder="Password"
              ref={(input) => (this.thirdInput = input)}
              secureTextEntry={true}
              style={[styles.textInput]}
            />
          </View>
          <View style={styles.description}>
            <Text style={{ color: theme.textOnBackground, fontSize: 20 }}>
              This app is for controlling or viewing live events diplayed by
              ProPresenter from the stage or wherever you would want.
            </Text>
            <Text
              style={{
                color: theme.textOnBackground,
                marginTop: 10,
                fontSize: 20,
              }}
            >
              To Connect:
            </Text>
            <Text style={{ color: theme.textOnBackground, fontSize: 20 }}>
              1: Preferences -&gt; Network -&gt; Enable Network
            </Text>
            <Text style={{ color: theme.textOnBackground, fontSize: 20 }}>
              2: In the same, enable remote and create a password
            </Text>
            <Text style={{ color: theme.textOnBackground, fontSize: 20 }}>
              3: Enter the IP Address, Port and Password. Click Connect
            </Text>
          </View>
        </View>
        {error &&
          error.map((err, index) => (
            <Text style={styles.error} key={index}>
              {err}
            </Text>
          ))}

        <TouchableOpacity
          disabled={status ? true : false}
          onPress={handleConnect}
        >
          <Text style={[styles.submitButton, { opacity: status ? 0.5 : 1 }]}>
            {status ? status : "Connect"}
          </Text>
        </TouchableOpacity>
        <StatusBar hidden />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 36,
    alignSelf: "center",
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 40,
  },
  connectForm: {
    gap: 5,
    flex: 1,
    width: "50%",
  },
  description: {
    flex: 1,
  },
  textInput: {
    borderColor: "white",
    backgroundColor: "rgba(255,255,255, 0.9)",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    marginTop: 20,
    fontSize: 28,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: theme.secondary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,

    padding: 10,
    marginVertical: 10,
  },
  errorInput: {
    borderColor: "firebrick",
    backgroundColor: "rgba(255, 209, 209, 0.9)",
  },
  error: {
    color: "firebrick",
    borderColor: "firebrick",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 4,
    padding: 4,
    paddingHorizontal: 12,
  },
  link: {
    marginTop: 20,
  },
});
