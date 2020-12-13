import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList } from "../types";

export default function SplashScreen({
  navigation
}: StackScreenProps<RootStackParamList, "Splash">) {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
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
  }
});
