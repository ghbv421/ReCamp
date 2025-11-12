import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { useRouter } from "expo-router";

// --- Camps with multi-category support ---
const camps = [
  { id: "cowboys", title: "Cowboy’s Camp", image: require("../../assets/images/Cowboys.png"), category: ["Mountain", "Adventure"] },
  { id: "agos", title: "Agos Camp", image: require("../../assets/images/Agos.png"), category: ["River", "Family"] },
  { id: "hapitanan", title: "Hapitanan Camp", image: require("../../assets/images/Hapitanan.png"), category: ["Mountain", "Nature"] },
  { id: "zion", title: "Zion Camp", image: require("../../assets/images/Zion.jpg"), category: ["Adventure", "Nature"] },
  { id: "lilbaguio", title: "Lil Baguio Camp", image: require("../../assets/images/Lilbaguio.png"), category: ["Cool Weather", "Mountain"] },
  { id: "vistaDelParaiso", title: "Vista del Paraíso", image: require("../../assets/images/Kauswagan.png"), category: ["Cool Weather", "Family"] },
];

const categories = ["All", "Adventure", "River", "Nature", "Mountain", "Cool Weather", "Family"];

export default function Home() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter camps by search and category
  const filteredCamps = camps.filter((camp) => {
    const matchesSearch = camp.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || camp.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

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

      {/* SEARCH & CATEGORIES */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#000000ff" style={{ marginHorizontal: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search camps..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryButton, selectedCategory === cat && styles.categorySelected]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextSelected]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* CAMP SLIDER */}
      {filteredCamps.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={64} color="#83492B" />
          <Text style={styles.noFav}>No camps found</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sliderContainer}>
          {filteredCamps.map((camp, index) => (
            <CampCard key={camp.id} camp={camp} toggleFavorite={toggleFavorite} favorites={favorites} index={index} />
          ))}
        </ScrollView>
      )}
    </ImageBackground>
  );
}

// --- INDIVIDUAL CAMP CARD WITH FADE-IN + HEART PULSE ---
function CampCard({ camp, toggleFavorite, favorites, index }: any) {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade-in animation when card mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleFavorite = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.7, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => toggleFavorite(camp.id));
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, marginRight: 12 }}>
      <TouchableOpacity
        style={styles.sliderItem}
        onPress={() => router.push({ pathname: "/camps/campdetails", params: { id: camp.id, title: camp.title } })}
      >
        <ImageBackground
          source={camp.image}
          style={styles.sliderImage}
          imageStyle={{ borderRadius: 14 }}
        >
          <TouchableOpacity style={styles.heartIcon} onPress={handleFavorite}>
            <Ionicons name={favorites[camp.id] ? "heart" : "heart-outline"} size={26} color="red" />
          </TouchableOpacity>
          <View style={styles.textOverlay}>
            <Text style={styles.sliderTitle}>{camp.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  background: { flex: 1 },
  header: { width: "100%", height: 90, flexDirection: "row", alignItems: "center", paddingHorizontal: 15, backgroundColor: "#83492B" },
  logo: { marginTop: 40, width: 60, height: 60, resizeMode: "contain", marginRight: 8 },
  recampText: { marginTop: 40, fontSize: 28, fontWeight: "500", color: "#fff" },
  searchContainer: { backgroundColor: "transparent", paddingVertical: 10, paddingHorizontal: 15,},
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#d58846", borderRadius: 8, height: 40, marginBottom: 10, borderBlockColor: "#524a4aff", borderWidth: 1 },
  searchInput: { flex: 1, height: "100%", paddingHorizontal: 8 },
  categories: { flexDirection: "row" },
  categoryButton: { paddingVertical: 6, paddingHorizontal: 12, borderBlockColor: "#050201ff", borderWidth: 1, borderRadius: 20, marginRight: 8 },
  categorySelected: { backgroundColor: "#83492B" },
  categoryText: { fontSize: 14, color: "#fffefeff" },
  categoryTextSelected: { color: "#fff", fontWeight: "bold" },
  sliderContainer: { paddingHorizontal: 15, paddingVertical: 10 },
  sliderItem: { width: 220, height: 160, justifyContent: "flex-end" },
  sliderImage: { width: "100%", height: "100%", justifyContent: "flex-end" },
  textOverlay: { backgroundColor: "rgba(0,0,0,0.4)", paddingVertical: 6, paddingHorizontal: 10, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
  sliderTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  heartIcon: { position: "absolute", top: 8, right: 10, zIndex: 1 },
  emptyContainer: { alignItems: "center", marginTop: 80 },
  noFav: { fontSize: 18, color: "#555", marginTop: 20, textAlign: "center" },
});
