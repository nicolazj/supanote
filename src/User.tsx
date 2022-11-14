import { Button, StyleSheet, Text, View } from "react-native";
import { supabase } from "./lib/supabase";

export function User({ user }: { user: any }) {
  let onLogout = () => {
    supabase.auth.signOut();
  };
  return (
    <View style={styles.container}>
      <Button onPress={onLogout} title="log out" />
      <Text>{JSON.stringify(user, null, 2)}</Text>
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
});
