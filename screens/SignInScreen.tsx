import * as React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useAuth } from "../hooks/useAuth";

export default function SignInScreen({
  navigation
}: StackScreenProps<RootStackParamList, "SignIn">) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const auth = useAuth();
  const handleSignIn = () => {
    auth.signIn({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>

      {auth.error && <Text>{auth.error.message}</Text>}

      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCompleteType="email"
        autoFocus={true}
        placeholder="Enter email, e.g. john.appleseed@mail.com"
      />
      <TextInput
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.input}
        autoCompleteType="password"
        placeholder="Enter password"
      />
      <Button onPress={handleSignIn} title="Sign In" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "stretch"
  }
});
