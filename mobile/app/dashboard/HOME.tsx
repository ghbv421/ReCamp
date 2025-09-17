import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >

      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logoheader.png")}
          style={styles.logo}
        />
        <Text style={styles.recampText}>RE CAMP</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.cardBox}>
          <ImageBackground
            source={require("../../assets/images/Cowboys.png")}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <Text style={styles.cardTitle}>Cowboy’s Camp</Text>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={22} color="red" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.cardBox}>
          <ImageBackground
            source={require("../../assets/images/Agos.png")}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <Text style={styles.cardTitle}>Camp Agos River</Text>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={22} color="red" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.cardBox}>
          <ImageBackground
            source={require("../../assets/images/Hapitanan.png")}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <Text style={styles.cardTitle}>Camp Hapitanan</Text>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={22} color="red" />
            </TouchableOpacity>
          </ImageBackground>

          <ImageBackground
            source={require("../../assets/images/Cowboys.png")}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <Text style={styles.cardTitle}>Cowboy’s Camp</Text>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={22} color="red" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.cardBox}>
          <ImageBackground
            source={require("../../assets/images/Agos.png")}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <Text style={styles.cardTitle}>Camp Agos River</Text>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={22} color="red" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.cardBox}>
          <ImageBackground
            source={require("../../assets/images/Hapitanan.png")}
            style={styles.cardImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <Text style={styles.cardTitle}>Camp Hapitanan</Text>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={22} color="red" />
            </TouchableOpacity>
          </ImageBackground>
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
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#83492B",
  },
  logo: {
    marginTop: 45,
    width: 120,
    resizeMode: "contain",
    marginRight: 8,
  },
  recampText: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 500,
    color: "#000000ff",
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 100,
  },

  cardBox: {
    backgroundColor: "#D2A679", 
    borderRadius: 16,
    padding: 6,              
    marginBottom: 15,
    elevation: 3,             
    shadowColor: "#000",       
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  cardImage: {
    height: 180,
    justifyContent: "flex-end",
    padding: 10,
  },
  cardTitle: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 16,
  },
  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
