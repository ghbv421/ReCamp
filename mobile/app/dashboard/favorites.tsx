import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { useRouter } from "expo-router";

// --- SAMPLE CAMP DATA ---
const camps = [
  { id: "cowboys", title: "Cowboy’s Camp", image: require("../../assets/images/Cowboys.png") },
  { id: "agos", title: "Camp Agos River", image: require("../../assets/images/Agos.png") },
  { id: "hapitanan", title: "Camp Hapitanan", image: require("../../assets/images/Hapitanan.png") },
  { id: "zion", title: "Camp Zion", image: require("../../assets/images/Zion.jpg") },
  { id: "lilbaguio", title: "Little Baguio", image: require("../../assets/images/Lilbaguio.png") },
  { id: "kauswagan", title: "Vista Del Paraiso", image: require("../../assets/images/Kauswagan.png") },
];

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

  const favoriteCamps = camps.filter((camp) => favorites[camp.id]);

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/logoheader2.png")} style={styles.logo} />
        <Text style={styles.recampText}>RE CAMP</Text>
      </View>

      {/* FAVORITES LIST */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {favoriteCamps.length === 0 ? (
          <Text style={styles.noFav}>No favorites yet</Text>
        ) : (
          favoriteCamps.map((camp) => <FavoriteCard key={camp.id} camp={camp} />)
        )}
      </ScrollView>
    </ImageBackground>
  );
}

// --- INDIVIDUAL FAVORITE CARD (WITH FADE ANIMATION) ---
function FavoriteCard({ camp }: { camp: any }) {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleUnfavorite = () => {
    // Animate fade-out before removing
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      toggleFavorite(camp.id);
    });
  };

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        style={styles.cardBox}
        onPress={() =>
          router.push({
            pathname: `/camps/campdetails`,
            params: { id: camp.id, title: camp.title },
          })
        }
      >
        <ImageBackground
          source={camp.image}
          style={styles.cardImage}
          imageStyle={{ borderRadius: 12 }}
        >
          <Text style={styles.cardTitle}>{camp.title}</Text>
          <TouchableOpacity style={styles.heartIcon} onPress={handleUnfavorite}>
            <Ionicons
              name={favorites[camp.id] ? "heart" : "heart-outline"}
              size={26}
              color="red"
            />
          </TouchableOpacity>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

// --- STYLES ---
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
    paddingBottom: 100,
  },
  noFav: {
    fontSize: 18,
    color: "#555",
    marginTop: 50,
    textAlign: "center",
  },
  cardBox: {
    backgroundColor: "#D2A679",
    borderRadius: 16,
    padding: 6,
    marginBottom: 15,
  },
  cardImage: {
    height: 180,
    justifyContent: "flex-end",
    padding: 10,
  },
  cardTitle: {
    backgroundColor: "#ffffffb3",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: 16,
  },
  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
