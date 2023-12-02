import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, TouchableOpacity } from "react-native";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import webSocketService from "../lib/utils/WebSocketService.js";

export default function App() {
  const [host, setHost] = useState();
  const [hostIsValid, setHostIsValid] = useState();
  const [port, setPort] = useState();
  const [portIsValid, setPortIsValid] = useState();
  const [password, setPassword] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [error, setError] = useState();
  const [status, setStatus] = useState();

  function handleConnect() {
    setError();
    host ? setHostIsValid(true) : setHostIsValid(false);
    port ? setPortIsValid(true) : setPortIsValid(false);
    password ? setPasswordIsValid(true) : setPasswordIsValid(false);
    if (!hostIsValid || !portIsValid) return;

    console.log(status ? "truthy" : "falsy");

    setStatus("Connecting");

    webSocketService.connect(host, port, password);
    webSocketService.socket.onopen = () => {
      setStatus("Authenticating");
      webSocketService.sendMessage({
        action: "authenticate",
        protocol: 701,
        password,
      });
    };
    webSocketService.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action !== "authenticate") return;

      console.log(data);
      if (data.authenticated === 0) {
        setStatus();
        setError(data.error);
      } else if (data.authenticated === 1) router.replace("/remote");
    };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <View style={styles.connectForm}>
        <TextInput
          style={[styles.textInput, hostIsValid === false && styles.errorInput]}
          value={host}
          onChangeText={setHost}
          keyboardType="numeric"
          placeholder="Ip Address (eg. 127.0.0.1)"
        />
        <TextInput
          style={[styles.textInput, portIsValid === false && styles.errorInput]}
          value={port}
          onChangeText={setPort}
          keyboardType="numeric"
          placeholder="Port (eg.1025)"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
          style={[
            styles.textInput,
            passwordIsValid === false && styles.errorInput,
          ]}
        />
        <TouchableOpacity
          style={[styles.submitButton, { opacity: status ? 0.5 : 1 }]}
          disabled={status}
          onPress={handleConnect}
        >
          <Text>{status ? status : "Connect"}</Text>
        </TouchableOpacity>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <TouchableOpacity style={styles.button}>
        <Button onPress={() => router.push("/remote")} title="Go To Remote" />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
  },
  connectForm: {
    width: "50%",
    maxWidth: 300,
    gap: 5,
  },
  textInput: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    marginTop: 20,
    fontSize: 30,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "white",
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
  },
  error: {
    color: "firebrick",
    borderColor: "firebrick",
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 20,
    padding: 4,
    paddingHorizontal: 12,
  },
  link: {
    marginTop: 20,
  },
});
