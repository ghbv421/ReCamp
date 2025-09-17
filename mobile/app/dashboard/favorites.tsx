import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import React from "react";

export default function Favorites() {
  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.recampText}>Favorites</Text>
        <View style={styles.line} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.box}>
          <Text style={styles.boxText}>Box 1</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 2</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 3</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 4</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 5</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 1</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 2</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 3</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 4</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 5</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: "center",
  },
  recampText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  line: {
    marginTop: 8,
    width: "100%",
    height: 1,
    backgroundColor: "#000000ff",
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  box: {
    width: "90%",
    height: 100,
    backgroundColor: "#D2A679",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, 
    shadowColor: "#f88c8cff",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  boxText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
  },
});
