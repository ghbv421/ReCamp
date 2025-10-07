

import { View, Text, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";

const camps = [
  { id: "cowboys", title: "Cowboy’s Camp", image: require("../../assets/images/Cowboys.png") },
  { id: "agos", title: "Camp Agos River", image: require("../../assets/images/Agos.png") },
  { id: "hapitanan", title: "Camp Hapitanan", image: require("../../assets/images/Hapitanan.png") },
  { id: "zion", title: "Camp Zion", image: require("../../assets/images/Zion.jpg") },
  { id: "lilbaguio", title: "Little Baguio", image: require("../../assets/images/Lilbaguio.png") },
  { id: "kauswagan", title: "Vista Del Paraiso", image: require("../../assets/images/Kauswagan.png") },
];

export default function Home() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Image source={require("../../assets/images/logoheader2.png")} style={styles.logo} />
        <Text style={styles.recampText}>RE CAMP</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {camps.map((camp) => (
          <View key={camp.id} style={styles.cardBox}>
            <ImageBackground source={camp.image} style={styles.cardImage} imageStyle={{ borderRadius: 12 }}>
              <Text style={styles.cardTitle}>{camp.title}</Text>
              <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(camp.id)}>
                <Ionicons
                  name={favorites[camp.id] ? "heart" : "heart-outline"}
                  size={26}
                  color="red"
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  header: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#83492B",
  },
  logo: {
    marginTop: 40,
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 8,
  },
  recampText: {
    marginTop: 40, 
    fontSize: 28,
    fontWeight: "500",
    color: "#ffffffff",
  },
  scrollContainer: { 
    padding: 15, 
    paddingBottom: 100 
  },
  cardBox: { 
    backgroundColor: "#D2A679", 
    borderRadius: 16, 
    padding: 6, 
    marginBottom: 15 
  },
  cardImage: { 
    height: 180, 
    justifyContent: "flex-end", 
    padding: 10 
  },
  cardTitle: {
    backgroundColor: "#ffffffb3",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 16,
  },
  heartIcon: { position: "absolute", bottom: 10, right: 10 },
});
