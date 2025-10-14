import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";

export default function Transact() {
  // --- Sample data ---
  const transactions = {
    Past: [
      {
        title: "Camp Hapitanan — Checked Out",
        time: "09-30-25 • 9:46 AM",
        image: require("../../assets/images/Hapitanan.png"),
        details: {
          "Reservation Date": "October 4, 2025",
          Customer: "Juan Dela Cruz",
          Contact: "+63 912 345 6789",
          "Stay Duration": "Overnight (2D1N)",
          "Check-in": "Oct 10, 2025 – 04:00 PM",
          "Check-out": "Oct 11, 2025 – 01:00 PM",
          Guests: 5,
          "Pay at Counter": "GCash",
          "Transaction ID": "0001ZXDVMLAZX084",
          Status: "Confirmed",
        },
      },
    ],
    Cancelled: [
      {
        title: "Little Baguio — Booking Cancelled",
        time: "09-29-25 • 2:30 PM",
        image: require("../../assets/images/Lilbaguio.png"),
        details: {
          "Reservation Date": "September 29, 2025",
          Customer: "Libby Manseguiao",
          Contact: "+63 123456789",
          "Stay Duration": "2 Days 1 Night",
          "Check-in": "Oct 10, 2025 – 04:00 PM",
          "Check-out": "Oct 11, 2025 – 01:00 PM",
          "Pay at Counter": "GCash",
          "Transaction ID": "0002ZXDVMJHYZ932",
          Status: "Cancelled",
        },
      },
    ],
  };

  const [activeTab, setActiveTab] = useState<"Past" | "Cancelled">("Past");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Render each transaction
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedItem(item)}>
      <Image source={item.image} style={styles.cardImage} />
      <View>
        <Text
          style={[
            styles.cardTitle,
            item.title.includes("Cancelled") && styles.cancelled,
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.cardTime,
            item.title.includes("Cancelled") && styles.cancelled,
          ]}
        >
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaction History</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(["Past", "Cancelled"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions[activeTab]}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Modal */}
      <Modal visible={!!selectedItem} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <ScrollView>
                <Image
                  source={selectedItem.image}
                  style={styles.detailImage}
                  resizeMode="cover"
                />
                <Text style={styles.modalTitle}>Transaction Details</Text>
                {Object.entries(selectedItem.details).map(([key, value]) => (
                  <Text key={key} style={styles.detailText}>
                    <Text style={styles.label}>{key}: </Text>
                    {String(value)}
                  </Text>
                ))}
              </ScrollView>
            )}
            <Pressable
              style={styles.closeBtn}
              onPress={() => setSelectedItem(null)}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  header: {
    width: "100%",
    paddingTop: 50,
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  line: {
    marginTop: 8,
    width: "30%",
    height: 2,
    backgroundColor: "#000",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
    width: "90%",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  activeTab: { borderBottomColor: "#000" },
  tabText: { fontSize: 18, color: "#777" },
  activeTabText: { color: "#000", fontWeight: "bold" },
  list: { width: "90%" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffcc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  cardImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#000" },
  cardTime: { fontSize: 13, color: "#555" },
  cancelled: { color: "#888" },
  overlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  detailImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailText: { fontSize: 14, marginBottom: 6 },
  label: { fontWeight: "bold" },
  closeBtn: {
    marginTop: 15,
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 10,
  },
  closeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
