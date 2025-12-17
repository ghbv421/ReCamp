import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity,
  Image, Animated, TextInput, ActivityIndicator, FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { useRouter, useFocusEffect } from "expo-router";
// @ts-ignore
import { placesAPI } from "../../services/api"; 

const CATEGORIES = ["Adventure", "River", "Nature", "Mountain", "Cool Weather", "Family"];

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

  const [camps, setCamps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // ✅ Track selected category for sorting
  const [selectedCategory, setSelectedCategory] = useState("All");

  useFocusEffect(
    useCallback(() => {
      fetchCamps();
    }, [])
  );

  const fetchCamps = async () => {
    try {
      const { data } = await placesAPI.getAll();
      setCamps(data);
    } catch (error) {
      console.log("Error fetching camps:", error);
    } finally {
      setLoading(false);
    }
  };

  // 1. Get ONLY the camps that are favorited
  const favoriteCamps = camps.filter((camp) => favorites[camp._id]);

  // 2. Filter by Search
  const searchResults = favoriteCamps.filter((camp) => 
    camp.title?.toLowerCase().includes(search.toLowerCase())
  );

  // 3. Sort Categories (Selected category moves to top)
  const sortedCategories = selectedCategory === "All" 
    ? CATEGORIES 
    : [selectedCategory, ...CATEGORIES.filter(c => c !== selectedCategory)];

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

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#000" style={{ marginHorizontal: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search favorites..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* ✅ CATEGORY FILTER CHIPS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
            <TouchableOpacity
                style={[styles.categoryButton, selectedCategory === "All" && styles.categorySelected]}
                onPress={() => setSelectedCategory("All")}
            >
                <Text style={[styles.categoryText, selectedCategory === "All" && styles.categoryTextSelected]}>All</Text>
            </TouchableOpacity>

            {CATEGORIES.map((cat) => (
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

      {/* MAIN CONTENT */}
      {loading ? (
           <ActivityIndicator size="large" color="#83492B" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false} // ✅ HIDDEN SCROLLBAR
        >
            {/* 1. IF SEARCHING: Show Grid */}
            {search.length > 0 ? (
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={styles.sectionTitle}>Search Results</Text>
                    {searchResults.length === 0 ? (
                        <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>No favorites found matching "{search}".</Text>
                    ) : (
                        searchResults.map((camp) => (
                            <FavoriteCardHorizontal key={camp._id} camp={camp} toggleFavorite={toggleFavorite} router={router} />
                        ))
                    )}
                </View>
            ) : (
                // 2. IF NOT SEARCHING: Show Sorted Categories
                <>
                    {/* "All Favorites" Section (Only visible if 'All' is selected) */}
                    {selectedCategory === "All" && favoriteCamps.length > 0 && (
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionTitle}>All Favorites</Text>
                            <FlatList
                                horizontal
                                data={favoriteCamps}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <FavoriteCard camp={item} toggleFavorite={toggleFavorite} router={router} />
                                )}
                                keyExtractor={item => item._id}
                                contentContainerStyle={{ paddingHorizontal: 15 }}
                            />
                        </View>
                    )}

                    {/* Loop through Sorted Categories */}
                    {sortedCategories.map((category) => {
                        // Filter user's favorites that match this category
                        const categoryFavs = favoriteCamps.filter(c => c.category && c.category.includes(category));
                        
                        if (categoryFavs.length === 0) return null;

                        return (
                            <View key={category} style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>{category} Favorites</Text>
                                <FlatList
                                    horizontal
                                    data={categoryFavs}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <FavoriteCard camp={item} toggleFavorite={toggleFavorite} router={router} />
                                    )}
                                    keyExtractor={item => item._id}
                                    contentContainerStyle={{ paddingHorizontal: 15 }}
                                />
                            </View>
                        );
                    })}

                    {/* Empty State */}
                    {favoriteCamps.length === 0 && (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="heart-outline" size={64} color="#83492B" />
                            <Text style={styles.noFav}>No favorites yet.</Text>
                            <TouchableOpacity onPress={() => router.push("/dashboard/home")} style={styles.exploreButton}>
                                <Text style={styles.exploreText}>Go explore camps</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
        </ScrollView>
      )}
    </ImageBackground>
  );
}

// --- VERTICAL CARD (For Sliders) ---
function FavoriteCard({ camp, toggleFavorite, router }: any) {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleUnfavorite = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
      toggleFavorite(camp._id);
    });
  };

  return (
    <Animated.View style={{ opacity: fadeAnim, marginRight: 15 }}>
      <TouchableOpacity
        style={styles.sliderItem}
        onPress={() => router.push({ pathname: "/camps/campdetails", params: { id: camp._id } })}
      >
        <ImageBackground
          source={camp.imageUrl ? { uri: camp.imageUrl } : require("../../assets/images/dashboardbg.png")}
          style={styles.sliderImage}
          imageStyle={{ borderRadius: 14 }}
        >
          <TouchableOpacity style={styles.heartIcon} onPress={handleUnfavorite}>
            <Ionicons name="heart" size={24} color="red" />
          </TouchableOpacity>
          <View style={styles.textOverlay}>
            <Text style={styles.sliderTitle} numberOfLines={1}>{camp.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

// --- HORIZONTAL CARD (For Search) ---
function FavoriteCardHorizontal({ camp, toggleFavorite, router }: any) {
    return (
        <TouchableOpacity 
            style={styles.searchCard}
            onPress={() => router.push({ pathname: "/camps/campdetails", params: { id: camp._id } })}
        >
            <Image source={camp.imageUrl ? { uri: camp.imageUrl } : require("../../assets/images/dashboardbg.png")} style={styles.searchImage} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.searchTitle}>{camp.title}</Text>
                <Text style={{ fontSize: 12, color: '#666' }}>{camp.category || "General"}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(camp._id)}>
                <Ionicons name="heart" size={24} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

// --- STYLES ---
const styles = StyleSheet.create({
  background: { flex: 1 },

  header: {
    width: "100%", height: 90, flexDirection: "row", alignItems: "center",
    paddingHorizontal: 15, backgroundColor: "#83492B",
  },
  logo: { marginTop: 40, width: 60, height: 60, resizeMode: "contain", marginRight: 8 },
  recampText: { marginTop: 40, fontSize: 28, fontWeight: "500", color: "#fff" },

  searchContainer: { paddingVertical: 10, paddingHorizontal: 15 },
  searchBar: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#d58846",
    borderWidth: 1, borderColor: "#524a4a", borderRadius: 10, height: 40, marginBottom: 10,
  },
  searchInput: { flex: 1, height: "100%", paddingHorizontal: 8 },

  // Filter Chips
  categoriesRow: { flexDirection: 'row', marginBottom: 5 },
  categoryButton: { 
    paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: "#333", 
    borderRadius: 20, marginRight: 8, backgroundColor: 'rgba(255,255,255,0.8)' 
  },
  categorySelected: { backgroundColor: "#83492B", borderColor: '#83492B' },
  categoryText: { fontSize: 14, color: "#333" },
  categoryTextSelected: { color: "#fff", fontWeight: "bold" },

  // Sections
  sectionContainer: { marginBottom: 25 },
  sectionTitle: { 
      fontSize: 18, fontWeight: "bold", color: "#333", marginLeft: 15, marginBottom: 10,
      textShadowColor: 'rgba(255, 255, 255, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1
  },

  // Cards
  sliderItem: { width: 200, height: 140, justifyContent: "flex-end" },
  sliderImage: { width: "100%", height: "100%", justifyContent: "flex-end" },
  textOverlay: { backgroundColor: "rgba(0,0,0,0.5)", paddingVertical: 8, paddingHorizontal: 10, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 },
  sliderTitle: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  heartIcon: { position: "absolute", top: 8, right: 8, zIndex: 1, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 20, padding: 4 },

  searchCard: { 
      flexDirection: 'row', backgroundColor: 'white', borderRadius: 10, padding: 10, marginBottom: 10, alignItems: 'center',
      shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
  },
  searchImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  searchTitle: { fontWeight: 'bold', fontSize: 16, color: '#333' },

  // Empty State
  emptyContainer: { alignItems: "center", marginTop: 80 },
  exploreButton: { marginTop: 15, backgroundColor: "#83492B", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  exploreText: { color: "#fff", fontWeight: "bold" },
  noFav: { fontSize: 18, color: "#555", marginTop: 20, textAlign: "center" },
});