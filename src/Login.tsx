import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "./lib/supabase";

export function Login() {
  let [email, emailSet] = useState("nick2@mailinator.com");

  let onSendMagicLink = async () => {
    console.log("on sign up");
    let redirectURL = Linking.createURL("/SignIn");
    const res = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: redirectURL,
      },
    });
    console.log({ redirectURL, res });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {false ? null : (
        <>
          <Text>Sign in</Text>

          <TextInput
            value={email}
            placeholder="email"
            onChangeText={emailSet}
            style={styles.input}
          ></TextInput>

          <Button
            onPress={onSendMagicLink}
            title="Send me the magic link"
          ></Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    margin: 12,
    width: "80%",
    padding: 12,
  },
});
