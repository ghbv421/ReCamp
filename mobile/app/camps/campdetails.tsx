// --- IMPORTS ---
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

// --- COMPONENT ---
export default function CampDetails() {
  const { id, title } = useLocalSearchParams();
  const router = useRouter();

  const campId = Array.isArray(id) ? id[0] : id;

  // --- Images ---
  const imageMap: { [key: string]: any } = {
    cowboys: require("../../assets/images/Cowboys.png"),
    agos: require("../../assets/images/Agos.png"),
    hapitanan: require("../../assets/images/Hapitanan.png"),
    zion: require("../../assets/images/Zion.jpg"),
    lilbaguio: require("../../assets/images/Lilbaguio.png"),
    kauswagan: require("../../assets/images/Kauswagan.png"),
  };

  const descriptions: { [key: string]: any } = {
  cowboys: {
    location:
      "Cowboy’s Camp is located in Barangay Kili-og, Libona, Bukidnon, perched atop Mt. Kitagas. Surrounded by rolling mountains and lush greenery, the camp offers a peaceful escape from city life. The area is known for its cool climate and scenic views, making it ideal for both day trips and overnight stays.",
    highlights:
      "Visitors can enjoy panoramic mountain vistas, refreshing breezes, and a chance to disconnect from urban noise. The camp features a small shelter for resting, and nature enthusiasts will love the hiking trails and birdwatching opportunities. Photography is particularly rewarding during sunrise and sunset.",
    fees:
      "Entrance Fee: ₱20 per person\nOvernight Fee: ₱50 per person\nThere are no corkage fees mentioned, making it an affordable getaway. Visitors are encouraged to bring their own tents, sleeping gear, and food if staying overnight.",
    howToGetThere:
      "The jump-off point is Kili-og Elementary School. From there, expect a moderately challenging 1-hour hike to the camp. It’s recommended to coordinate with the Barangay Council for guidance and local advice. The trail is well-marked but be prepared for uneven terrain.",
    considerations:
      "Weather can change rapidly; bring rain gear and warm clothing. The hike is moderate, so wear proper hiking shoes and carry water. Mobile signals may be weak, so plan accordingly. Overnight campers should bring sufficient supplies and practice leave-no-trace camping.",
  },

  agos: {
    location:
      "Agos Camp is nestled near a flowing river in Libona, Bukidnon. The site is known for its serene water surroundings and lush vegetation, providing a perfect setting for families and casual campers. The sound of the river adds a calming ambiance throughout the day.",
    highlights:
      "Activities include river swimming, picnicking, and hiking along riverside trails. The camp offers scenic mountain backdrops and shaded spots for relaxation. It’s an excellent location for nature photography and casual outdoor games.",
    fees:
      "Entrance Fee: ₱15 per person\nOvernight Fee: ₱40 per person\nNo corkage fees apply. Budget-friendly for families and groups looking for a quiet riverside retreat.",
    howToGetThere:
      "The jump-off point is Agos Barangay Hall. Hikers can expect a 30-minute walk along a scenic riverside trail to reach the camp. Paths are mostly flat but may be slippery after rain, so proper footwear is advised.",
    considerations:
      "River currents can be strong, especially during the rainy season. Bring water shoes, insect repellent, and camping gear. Overnight campers should secure tents on higher ground to avoid flooding. Leave no trace to preserve the river environment.",
  },

  hapitanan: {
    location:
      "Hapitanan Camp is a hilltop campsite in Malaybalay, Bukidnon, offering sweeping views of the surrounding valleys and hills. Its elevated location provides cooler temperatures and a peaceful environment, perfect for a weekend escape.",
    highlights:
      "Visitors can enjoy stunning sunrise views, trekking on well-marked trails, and stargazing at night. The hilltop location offers panoramic vistas and opportunities for nature photography, wildlife spotting, and quiet meditation.",
    fees:
      "Entrance Fee: ₱25 per person\nOvernight Fee: ₱60 per person. The camp is accessible for day trips or overnight stays, with minimal facilities on-site, so plan accordingly.",
    howToGetThere:
      "Jump-off is from Barangay Malaybalay Center, followed by a 45-minute uphill trek. The path is moderately steep, so wear sturdy hiking shoes and carry water. Local guides can provide directions and safety tips.",
    considerations:
      "Steep trails may be challenging for beginners. Bring trekking poles if needed. Nights can be cold, so pack warm clothing. Ensure you have enough food and camping gear for overnight stays.",
  },

  zion: {
    location:
      "Zion Camp is located in a serene forested area in Bukidnon, offering campers an immersive nature experience. Towering trees and natural trails create a tranquil atmosphere, perfect for reflection and outdoor activities.",
    highlights:
      "Hiking, camping, and nature walks are popular here. The calm environment is ideal for meditation, photography, and connecting with nature. Birdwatchers and wildlife enthusiasts will find plenty to explore.",
    fees:
      "Entrance Fee: ₱30 per person\nOvernight Fee: ₱70 per person. Facilities are minimal, preserving the natural ambiance. Campers should bring their own tents and provisions.",
    howToGetThere:
      "The jump-off point is the Zion Forest Trailhead. The hike to the campsite takes about 1 hour along shaded trails. Trail markers guide visitors, but local knowledge is helpful for first-timers.",
    considerations:
      "Prepare for uneven terrain and insects. Nights can be cool, so bring warm clothing and a sturdy tent. Follow eco-friendly camping practices and respect wildlife habitats.",
  },

  lilbaguio: {
    location:
      "Lil Baguio Camp is situated in the cooler highland areas of Bukidnon, offering fresh mountain air and breathtaking landscapes. Its elevated location provides panoramic views of rolling hills and valleys.",
    highlights:
      "Visitors can enjoy camping under the stars, trekking along scenic trails, and photographing the picturesque surroundings. The cool breeze makes it ideal for relaxation and outdoor activities.",
    fees:
      "Entrance Fee: ₱20 per person\nOvernight Fee: ₱50 per person. The camp provides basic facilities, and visitors are encouraged to bring personal camping gear.",
    howToGetThere:
      "Jump-off is from Barangay Lil Baguio Center, followed by a 40-minute hike. The terrain is moderately hilly, and hikers should wear suitable footwear and carry sufficient water.",
    considerations:
      "Cold nights require warm clothing and sleeping gear. Insects may be present, so bring repellents. Respect local wildlife and camp responsibly.",
  },

  kauswagan: {
    location:
      "Kauswagan Camp is a riverside campground in Bukidnon, surrounded by lush greenery and flowing waters. The natural setting offers a peaceful escape and opportunities for water-based activities.",
    highlights:
      "Visitors can enjoy fishing, river swimming, and hiking along nearby trails. The riverside location provides scenic views and a relaxing environment. Ideal for families and small groups seeking outdoor recreation.",
    fees:
      "Entrance Fee: ₱15 per person\nOvernight Fee: ₱45 per person. Budget-friendly for both day trips and overnight camping.",
    howToGetThere:
      "Jump-off is from Barangay Kauswagan Hall, followed by a 35-minute riverside trail hike. The path is mostly level but can be slippery near water, so wear appropriate shoes.",
    considerations:
      "River currents and insects may pose challenges. Bring proper gear, water shoes, and insect repellent. Ensure tents are set up on higher ground, and always clean up after your stay.",
  },
};


  const campImage = imageMap[campId!] || require("../../assets/images/default.png");
  const campDescription = descriptions[campId!] || {
    location: "No information available.",
    highlights: "",
    fees: "",
    howToGetThere: "",
    considerations: "",
  };

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        {/* HEADER IMAGE */}
        <View style={styles.imageContainer}>
          <Image source={campImage} style={styles.headerImage} />

          {/* BACK BUTTON */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>

          {/* TITLE OVERLAY */}
          <View style={styles.titleOverlay}>
            <Text style={styles.titleText}>{title || "Camp Details"}</Text>
          </View>
        </View>

        {/* INFORMATION SECTION */}
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>📍 Location & General Info</Text>
          <Text style={styles.sectionText}>{campDescription.location}</Text>

          <Text style={styles.sectionTitle}>🌄 What to Expect / Highlights</Text>
          <Text style={styles.sectionText}>{campDescription.highlights}</Text>

          <Text style={styles.sectionTitle}>💰 Fees & Practical Info</Text>
          <Text style={styles.sectionText}>{campDescription.fees}</Text>

          <Text style={styles.sectionTitle}>🗺️ How to Get There</Text>
          <Text style={styles.sectionText}>{campDescription.howToGetThere}</Text>

          <Text style={styles.sectionTitle}>⚠️ Things to Consider</Text>
          <Text style={styles.sectionText}>{campDescription.considerations}</Text>

          <Text style={styles.sectionDivider}>
            _____________________________________________________
          </Text>

          {/* ADD RESERVATION BUTTON */}
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() =>
              router.push({
                pathname: "/camps/addreservation",
                params: {
                  id: campId,
                  title,
                  image: campImage, // ✅ Pass the image
                },
              })
            }
          >
            <Text style={styles.reserveText}>Add Reservation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  background: { flex: 1 },
  scrollContainer: { alignItems: "center" }, // removed paddingBottom
  imageContainer: { width: "110%", position: "relative" },
  headerImage: { width: "100%", height: 200, resizeMode: "cover" },
  backButton: {
    position: "absolute",
    top: 40,
    left: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 6,
    borderRadius: 50,
    zIndex: 10,
  },
  titleOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#ffffffcc",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#1a1a1ae6",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
    paddingBottom: 0, // removed extra bottom padding
    marginBottom: 0,
  },
  sectionTitle: {
    color: "#f28c28",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  sectionText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  sectionDivider: {
    color: "#aaa",
    textAlign: "center",
    marginVertical: 10,
  },
  reserveButton: {
    backgroundColor: "#f28c28",
    marginTop: 20, // smaller spacing
    marginBottom: 0, // removed bottom margin
    paddingVertical: 18,
    marginHorizontal: 80,
    borderRadius: 30,
    alignItems: "center",
  },
  reserveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
