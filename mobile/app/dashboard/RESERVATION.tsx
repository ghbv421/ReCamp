import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";

export default function Reservation() {
  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >

      <View style={styles.header}>
        <Text style={styles.recampText}>My Reservations</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Past</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.text}></Text>
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
    justifyContent: "center",
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
    backgroundColor: "#000",
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: "#d3d3d3",
    borderRadius: 5,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
