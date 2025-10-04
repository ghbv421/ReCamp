import { View, Text, StyleSheet, ImageBackground, ScrollView, Image } from "react-native";
import React from "react";
import { useFavorites } from "../context/FavoritesContext";

const camps = [
  { id: "cowboys", title: "Cowboy’s Camp", image: require("../../assets/images/Cowboys.png") },
  { id: "agos", title: "Camp Agos River", image: require("../../assets/images/Agos.png") },
  { id: "hapitanan", title: "Camp Hapitanan", image: require("../../assets/images/Hapitanan.png") },
  { id: "zion", title: "Camp Zion", image: require("../../assets/images/Zion.jpg") },
  { id: "lilbaguio", title: "Little Baguio", image: require("../../assets/images/Lilbaguio.png") },
  { id: "kauswagan", title: "Vista Del Paraiso", image: require("../../assets/images/Kauswagan.png") },
];

export default function Favorites() {
  const { favorites } = useFavorites();
  const favoriteCamps = camps.filter((camp) => favorites[camp.id]);

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/logoheader.png")} style={styles.logo} />
        <Text style={styles.recampText}>RE CAMP</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {favoriteCamps.length === 0 ? (
          <Text style={styles.noFav}>No favorites yet </Text>
        ) : (
          favoriteCamps.map((camp) => (
            <View key={camp.id} style={styles.box}>
              <Image source={camp.image} style={styles.boxImage} />
              <Text style={styles.boxText}>{camp.title}</Text>
            </View>
          ))
        )}
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
    marginTop: 60,
    width: 120,
    resizeMode: "contain",
    marginRight: 8,
  },
  recampText: {
    marginTop: 40, 
    fontSize: 28,
    fontWeight: "500",
    color: "#000",
  },

  scrollContainer: { 
    padding: 20, 
    alignItems: "center" 
  },
  noFav: { 
    fontSize: 18, 
    color: "#555", 
    marginTop: 50 
  },
  box: {
    width: "90%",
    backgroundColor: "#D2A679",
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    padding: 10,
  },
  boxImage: { width: "100%", height: 120, borderRadius: 8, marginBottom: 8 },
  boxText: { fontSize: 18, fontWeight: "bold", color: "#000" },
});
