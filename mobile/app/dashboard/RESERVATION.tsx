import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";

export default function reservation() {
  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.text}> Reservation Screen</Text>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold"
  },
});
