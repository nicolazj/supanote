import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "./src/lib/supabase";
import { Login } from "./src/Login";
import { User } from "./src/User";
import * as Linking from "expo-linking";

async function extractSessionFromLink(link: string) {
  let parsedURL = Linking.parse(link.replace("#", "?")!);
  console.log("extractSessionFromLink---", { parsedURL });
  if (parsedURL.queryParams.access_token) {
    supabase.auth.setSession({
      access_token: parsedURL.queryParams.access_token as string,
      refresh_token: parsedURL.queryParams.refresh_token as string,
    });
  }
}

export default function App() {
  let [loading, loadingSet] = useState(true);
  let [user, userSet] = useState(undefined);

  useEffect(() => {
    let load = async () => {
      let res = await supabase.auth.getSession();
      userSet(res.data?.session?.user);
      loadingSet(false);
    };
    load();
  }, []);

  useEffect(() => {
    console.log("listening onAuthStateChange -----");
    let { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("onAuthStateChange----", { event });
      userSet(session?.user);
    });
    return () => {
      console.log("unsub onAuthStateChange -----");
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        extractSessionFromLink(url!);
      }
    });

    function handler(res: { url: string }) {
      if (res.url) {
        extractSessionFromLink(res.url);
      }
    }

    let sub = Linking.addEventListener("url", handler);

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {loading ? <Text>Loading</Text> : user ? <User user={user} /> : <Login />}
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
