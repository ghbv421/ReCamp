import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

// --- Camp data (images + descriptions) ---
const camps: { [key: string]: any } = {
  cowboys: {
    image: require("../../assets/images/Cowboys.png"),
    title: "Cowboy’s Camp",
    location:
      "Cowboy’s Camp is perched atop Mt. Kitagas, surrounded by mountains and lush greenery, offering a peaceful escape from city life.",
    highlights:
      "Panoramic mountain vistas, Refreshing breezes, Hiking trails, Birdwatching, Sunrise/Sunset photography",
    fees:
      "Entrance Fee: ₱20 per person. Overnight: ₱50 per person. Affordable getaway; bring own tents & gear for overnight.",
    howToGetThere:
      "Jump-off: Kili-og Elementary School, 1-hour moderate hike. Trail well-marked, coordinate with Barangay Council.",
    considerations:
      "Weather changes rapidly; bring rain gear & warm clothes. Wear proper hiking shoes and carry water. Mobile signal may be weak.",
  },
  agos: {
    image: require("../../assets/images/Agos.png"),
    title: "Agos Camp",
    location:
      "Nestled near a river with lush vegetation, perfect for families and casual campers.",
    highlights: "River swimming, Picnicking, Hiking trails, Scenic mountain backdrops",
    fees: "Entrance Fee: ₱15 | Overnight: ₱40. Budget-friendly riverside retreat.",
    howToGetThere:
      "Jump-off: Agos Barangay Hall, 30-minute flat riverside walk. Wear proper footwear.",
    considerations:
      "River currents strong during rainy season. Bring water shoes & insect repellent. Secure tents on higher ground.",
  },
  hapitanan: {
    image: require("../../assets/images/Hapitanan.png"),
    title: "Hapitanan Camp",
    location:
      "Hilltop campsite offering sweeping views of valleys and hills in Malaybalay.",
    highlights:
      "Sunrise views, Trekking, Stargazing, Panoramic vistas, Wildlife spotting, Meditation",
    fees: "Entrance: ₱25 | Overnight: ₱60. Minimal on-site facilities; plan ahead.",
    howToGetThere:
      "Jump-off: Barangay Malaybalay Center, 45-min uphill trek. Moderately steep; bring sturdy shoes & water.",
    considerations:
      "Steep trails; nights can be cold. Bring trekking poles, warm clothing, and enough supplies for overnight.",
  },
  zion: {
    image: require("../../assets/images/Zion.jpg"),
    title: "Zion Camp",
    location: "Zion Camp is a serene location with open meadows and forest trails.",
    highlights: "Hiking, Meditation, Wildlife spotting, Star gazing",
    fees: "Entrance Fee: ₱20 | Overnight: ₱50",
    howToGetThere: "Jump-off: Zion Barangay Hall, 1-hour walk, trail marked",
    considerations: "Bring mosquito repellent and sufficient water. Limited mobile signal.",
  },
  lilbaguio: {
    image: require("../../assets/images/Lilbaguio.png"),
    title: "Lil Baguio Camp",
    location:
      "Lil Baguio Camp offers a cool mountain retreat surrounded by pine trees.",
    highlights: "Hiking, Scenic Views, Picnic Areas, Camping",
    fees: "Entrance Fee: ₱30 | Overnight: ₱70",
    howToGetThere:
      "Jump-off: Lil Baguio Barangay Hall, 45-minute moderate hike. Wear proper shoes.",
    considerations: "Mountain weather can change quickly; bring warm clothes and rain gear.",
  },
  vistaDelParaiso: {
    image: require("../../assets/images/Kauswagan.png"),
    title: "Vista del Paraíso",
    location:
      "Vista del Paraíso is a scenic riverside and hillside camp with breathtaking views of nature, ideal for family outings and leisure camping.",
    highlights:
      "River swimming, Hiking trails, Birdwatching, Bonfire nights, Sunset photography",
    fees:
      "Entrance Fee: ₱25 | Overnight: ₱60. Day use and camping facilities available. Bring your own tents for overnight stays.",
    howToGetThere:
      "Jump-off: Vista del Paraíso Barangay Hall, 30-min riverside walk to campsite. Follow marked paths and local guides for safety.",
    considerations:
      "River currents can be strong during rainy season. Bring mosquito repellent, water, and camping gear. Limited mobile signal.",
  },
};

export default function CampDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const campId = Array.isArray(id) ? id[0] : id;

  // Safe fallback
  const camp = camps[campId!] || {
    image: require("../../assets/images/default.png"),
    title: "Unknown Camp",
    location: "No information available",
    highlights: "",
    fees: "N/A",
    howToGetThere: "N/A",
    considerations: "N/A",
  };

  const [readMore, setReadMore] = useState<{ [key: string]: boolean }>({});

  const toggleReadMore = (section: string) => {
    setReadMore((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    { key: "location", icon: <Ionicons name="location-outline" size={16} color="#f28c28" />, title: "Location & Info", content: camp.location },
    { key: "fees", icon: <Ionicons name="cash-outline" size={16} color="#f28c28" />, title: "Fees", content: camp.fees },
    { key: "howToGetThere", icon: <MaterialIcons name="directions-walk" size={16} color="#f28c28" />, title: "How to Get There", content: camp.howToGetThere },
    { key: "considerations", icon: <Ionicons name="warning-outline" size={16} color="#f28c28" />, title: "Things to Consider", content: camp.considerations },
  ];

  const highlightList = camp.highlights ? camp.highlights.split(",").map((h: string) => h.trim()) : [];

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={camp.image} style={styles.headerImage} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleOverlay}>
          <Text style={styles.titleText}>{camp.title}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Highlights Slider */}
        {highlightList.length > 0 && (
          <View style={{ marginTop: 15, marginBottom: 20 }}>
            <Text style={styles.sliderTitle}>     Highlights & Activities</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 15 }}>
              {highlightList.map((item: string, idx: number) => (
                <View key={idx} style={styles.highlightCard}>
                  <Text style={styles.highlightText}>{item}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Info Cards */}
        <View style={{ paddingHorizontal: 15 }}>
          {sections.map((section) => (
            <View key={section.key} style={styles.infoCard}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                {section.icon}
                <Text style={styles.cardTitle}>{section.title}</Text>
              </View>
              <Text style={styles.cardText}>
                {readMore[section.key]
                  ? section.content
                  : section.content.slice(0, 120) + (section.content.length > 120 ? "..." : "")}
                {section.content.length > 120 && (
                  <Text style={{ color: "#f28c28" }} onPress={() => toggleReadMore(section.key)}>
                    {readMore[section.key] ? " Show Less" : " Read More"}
                  </Text>
                )}
              </Text>
            </View>
          ))}

          {/* Reservation Button */}
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() =>
              router.push({
                pathname: "/camps/addreservation",
                params: { id: campId, title: camp.title, image: camp.image },
              })
            }
          >
            <Text style={styles.reserveText}>Add Reservation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  imageContainer: { width: "100%", height: 220, position: "relative" },
  headerImage: { width: "100%", height: "100%", resizeMode: "cover", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backButton: { position: "absolute", top: 40, left: 20, backgroundColor: "rgba(0,0,0,0.5)", padding: 6, borderRadius: 50 },
  titleOverlay: { position: "absolute", bottom: 15, left: 20, backgroundColor: "rgba(255,255,255,0.8)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  titleText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  sliderTitle: { fontWeight: "bold", color: "#f28c28", fontSize: 16, marginBottom: 10 },
  highlightCard: { backgroundColor: "#f28c28", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  highlightText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  infoCard: { backgroundColor: "#fff", borderRadius: 16, padding: 15, marginBottom: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5 },
  cardTitle: { fontWeight: "bold", color: "#f28c28", fontSize: 15, marginLeft: 6 },
  cardText: { fontSize: 14, color: "#333", lineHeight: 20 },
  reserveButton: { backgroundColor: "#f28c28", paddingVertical: 16, borderRadius: 30, alignItems: "center", marginHorizontal: 50, marginTop: 20 },
  reserveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
