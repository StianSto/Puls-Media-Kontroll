import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [ipAdress, setIpAdress] = useState();
  const [ipAdressIsValid, setIpAdressIsValid] = useState();
  const [host, setHost] = useState();
  const [hostIsValid, setHostIsValid] = useState();
  const [password, setPassword] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [error, setError] = useState();

  function handleConnect() {
    ipAdress ? setIpAdressIsValid(true) : setIpAdressIsValid(false);
    host ? setHostIsValid(true) : setHostIsValid(false);
    password ? setPasswordIsValid(true) : setPasswordIsValid(false);

    console.log(ipAdress, host, password);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <View style={styles.connectForm}>
        <TextInput
          style={[
            styles.textInput,
            ipAdressIsValid === false && styles.errorInput,
          ]}
          value={ipAdress}
          onChangeText={setIpAdress}
          placeholder="Ip Address"
        />
        <TextInput
          style={[styles.textInput, hostIsValid === false && styles.errorInput]}
          value={host}
          onChangeText={setHost}
          keyboardType="numeric"
          placeholder="Host"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={[
            styles.textInput,
            passwordIsValid === false && styles.errorInput,
          ]}
        />
        <TouchableOpacity style={styles.button}>
          <Button onPress={handleConnect} title="Connect" />
        </TouchableOpacity>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

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
  button: {
    marginTop: 20,
    fontSize: 30,
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
});
