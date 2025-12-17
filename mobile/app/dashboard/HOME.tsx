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
// ✅ Import UserContext to check for Admin Role
import { useUser } from "../../app/context/UserContext";

// Default Order of Categories
const CATEGORIES = ["Adventure", "River", "Nature", "Mountain", "Cool Weather", "Family"];

export default function Home() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  
  // ✅ Get User Data to check Role
  const { userData } = useUser();

  const [camps, setCamps] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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

  const searchResults = camps.filter((camp) => 
    camp.title?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCategories = selectedCategory === "All" 
    ? CATEGORIES 
    : [selectedCategory, ...CATEGORIES.filter(c => c !== selectedCategory)];

  return (
    <ImageBackground source={require("../../assets/images/dashboardbg.png")} style={styles.background}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/logoheader2.png")} style={styles.logo} />
        <Text style={styles.recampText}>RE CAMP</Text>

        {/* ✅ ADMIN ONLY: Add Camp Button */}
        {/* Only show this button if the logged-in user is an admin */}
        {userData?.role === 'admin' && (
          <TouchableOpacity 
            onPress={() => router.push('/camps/addCamps')} 
            style={{ marginLeft: 'auto', marginTop: 40, backgroundColor: 'white', padding: 8, borderRadius: 50 }}
          >
            <Ionicons name="add" size={24} color="#83492B" />
          </TouchableOpacity>
        )}
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#000" style={{ marginHorizontal: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search camps..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

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
        <ActivityIndicator size="large" color="#83492B" style={{marginTop: 50}} />
      ) : (
        <ScrollView 
          style={styles.mainScroll} 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          
          {/* 1. IF SEARCHING: Show Grid */}
          {search.length > 0 ? (
            <View style={{ paddingHorizontal: 15 }}>
              <Text style={styles.sectionTitle}>Search Results</Text>
              {searchResults.length === 0 ? (
                 <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>No camps found.</Text>
              ) : (
                searchResults.map((camp, index) => (
                   <CampCardHorizontal key={camp._id} camp={camp} toggleFavorite={toggleFavorite} favorites={favorites} router={router} />
                ))
              )}
            </View>
          ) : (
            
            // 2. IF NOT SEARCHING: Show Category Sliders
            <>
              {selectedCategory === "All" && (
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Featured Camps</Text>
                    <FlatList
                    horizontal
                    data={camps}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <CampCard camp={item} toggleFavorite={toggleFavorite} favorites={favorites} index={index} router={router} />
                    )}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    />
                </View>
              )}

              {sortedCategories.map((category) => {
                const categoryCamps = camps.filter(c => c.category && c.category.includes(category));
                if (categoryCamps.length === 0) return null;

                return (
                  <View key={category} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{category} Spots</Text>
                    <FlatList
                      horizontal
                      data={categoryCamps}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => (
                        <CampCard camp={item} toggleFavorite={toggleFavorite} favorites={favorites} index={index} router={router} />
                      )}
                      keyExtractor={item => item._id}
                      contentContainerStyle={{ paddingHorizontal: 15 }}
                    />
                  </View>
                );
              })}
            </>
          )}

          {camps.length === 0 && !loading && (
             <View style={{ alignItems: 'center', marginTop: 50 }}>
                <Text>No camps available yet.</Text>
             </View>
          )}

        </ScrollView>
      )}
    </ImageBackground>
  );
}

// --- COMPONENTS ---
function CampCard({ camp, toggleFavorite, favorites, index, router }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 100, useNativeDriver: true }).start();
  }, []);

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
          <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(camp._id)}>
            <Ionicons name={favorites[camp._id] ? "heart" : "heart-outline"} size={24} color="red" />
          </TouchableOpacity>
          <View style={styles.textOverlay}>
            <Text style={styles.sliderTitle} numberOfLines={1}>{camp.title}</Text>
            <Text style={{color:'white', fontSize: 11, fontWeight:'600'}}>
               {camp.price ? `₱${camp.price}` : 'Check details'}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
}

function CampCardHorizontal({ camp, toggleFavorite, favorites, router }: any) {
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
                <Ionicons name={favorites[camp._id] ? "heart" : "heart-outline"} size={24} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  mainScroll: { flex: 1 },
  
  header: { width: "100%", height: 90, flexDirection: "row", alignItems: "center", paddingHorizontal: 15, backgroundColor: "#83492B" },
  logo: { marginTop: 40, width: 60, height: 60, resizeMode: "contain", marginRight: 8 },
  recampText: { marginTop: 40, fontSize: 28, fontWeight: "500", color: "#fff" },
  
  searchContainer: { paddingVertical: 10, paddingHorizontal: 15 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#d58846", borderRadius: 8, height: 40, borderWidth: 1, borderColor: "#524a4a", marginBottom: 10 },
  searchInput: { flex: 1, height: "100%", paddingHorizontal: 8, color: 'black' },

  categoriesRow: { flexDirection: 'row', marginBottom: 5 },
  categoryButton: { paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: "#333", borderRadius: 20, marginRight: 8, backgroundColor: 'rgba(255,255,255,0.8)' },
  categorySelected: { backgroundColor: "#83492B", borderColor: '#83492B' },
  categoryText: { fontSize: 14, color: "#333" },
  categoryTextSelected: { color: "#fff", fontWeight: "bold" },

  sectionContainer: { marginBottom: 25 },
  sectionTitle: { 
      fontSize: 18, fontWeight: "bold", color: "#333", marginLeft: 15, marginBottom: 10,
      textShadowColor: 'rgba(255, 255, 255, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1
  },

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
  searchTitle: { fontWeight: 'bold', fontSize: 16, color: '#333' }
});