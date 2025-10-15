import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { useRouter } from "expo-router";

const camps = [
  { id: "cowboys", title: "Cowboy’s Camp", image: require("../../assets/images/Cowboys.png"), description: "Experience a wild west adventure at Cowboy’s Camp!" },
  { id: "agos", title: "Camp Agos River", image: require("../../assets/images/Agos.png"), description: "Relax by the river with scenic views at Camp Agos." },
  { id: "hapitanan", title: "Camp Hapitanan", image: require("../../assets/images/Hapitanan.png"), description: "Enjoy forest serenity and nature trails at Hapitanan." },
  { id: "zion", title: "Camp Zion", image: require("../../assets/images/Zion.jpg"), description: "An elevated escape surrounded by mountain breeze." },
  { id: "lilbaguio", title: "Little Baguio", image: require("../../assets/images/Lilbaguio.png"), description: "Cool weather and pine views — Baguio feels!" },
  { id: "kauswagan", title: "Vista Del Paraiso", image: require("../../assets/images/Kauswagan.png"), description: "Paradise views with family-friendly activities." },
];

export default function Home() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

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
          <TouchableOpacity
            key={camp.id}
            style={styles.cardBox}
            onPress={() => router.push({
              pathname: "/camps/campdetails",
              params: { ...camp }
            })}
          >
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
          </TouchableOpacity>
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
  logo: { marginTop: 40, width: 60, height: 60, resizeMode: "contain", marginRight: 8 },
  recampText: { marginTop: 40, fontSize: 28, fontWeight: "500", color: "#fff" },
  scrollContainer: { padding: 15, paddingBottom: 100 },
  cardBox: { backgroundColor: "#D2A679", borderRadius: 16, padding: 6, marginBottom: 15 },
  cardImage: { height: 180, justifyContent: "flex-end", padding: 10 },
  cardTitle: { backgroundColor: "#ffffffb3", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, fontWeight: "bold", fontSize: 16 },
  heartIcon: { position: "absolute", bottom: 10, right: 10 },
});
