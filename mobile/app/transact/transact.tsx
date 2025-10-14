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
  Pressable,
  ScrollView,
  ImageSourcePropType,
} from "react-native";

// 🧩 Define types for clarity
type TransactionDetails = {
  [key: string]: string | number;
};

type TransactionItem = {
  id: string;
  title: string;
  time: string;
  image: ImageSourcePropType;
  details: TransactionDetails;
};

export default function Transact() {
  // --- SAMPLE DATA ---
  const pastTransactions: TransactionItem[] = [
    {
      id: "1",
      title: "Camp Hapitanan — Checked Out",
      time: "09-30-25 • 9:46 AM",
      image: require("../../assets/images/Hapitanan.png"),
      details: {
        "Transaction ID": "TRX-20251004-001",
        "Reservation Date": "October 4, 2025",
        Customer: "Juan Dela Cruz",
        Contact: "+63 912 345 6789",
        Campsite: "Camp H – Site A",
        "Stay Type": "Overnight (2D1N)",
        "Check-in": "Oct 10, 2025 – 04:00 PM",
        "Check-out": "Oct 11, 2025 – 01:00 PM",
        Guests: 5,
        "Payment Method": "GCash",
        "Amount Paid": "₱3,500.00",
        Status: "Confirmed",
      },
    },
  ];

  const cancelledTransactions: TransactionItem[] = [
    {
      id: "2",
      title: "Little Baguio — Booking Cancelled",
      time: "09-29-25 • 2:30 PM",
      image: require("../../assets/images/Lilbaguio.png"),
      details: {
        Campsite: "Little Baguio",
        Name: "Libby Manseguiao",
        Email: "libgwaps@gmail.com",
        "Contact Number": "123456789",
        Address: "Haws ni crush",
        "Date Issued": "09-30-25 • 9:46 AM",
        "Date Cancelled": "09-30-25 • 9:46 AM",
        Status: "Cancelled",
      },
    },
  ];

  // --- STATE ---
  const [activeTab, setActiveTab] = useState<"Past" | "Cancelled">("Past");
  const [selectedItem, setSelectedItem] = useState<TransactionItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  // --- SELECT DATA BASED ON TAB ---
  const data = activeTab === "Past" ? pastTransactions : cancelledTransactions;

  // --- SHOW DETAILS ---
  const openDetails = (item: TransactionItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // --- RENDER CARD (LIST ITEM) ---
  const renderItem = ({ item }: { item: TransactionItem }) => (
    <TouchableOpacity style={styles.card} onPress={() => openDetails(item)}>
      <Image source={item.image} style={styles.icon} />
      <View style={styles.cardText}>
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
      style={styles.bg}
    >
      <Text style={styles.title}>Transaction History</Text>

      {/* --- TABS --- */}
      <View style={styles.tabs}>
        {["Past", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as "Past" | "Cancelled")}
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

      {/* --- TRANSACTION LIST --- */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* --- MODAL FOR DETAILS --- */}
      <Modal visible={showModal} animationType="slide" transparent>
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
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
// --- STYLES ---
const styles = StyleSheet.create({
  bg: { flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 55,
    marginBottom: 25,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#ccc",
  },
  activeTab: { borderBottomColor: "#000" },
  tabText: { fontSize: 18, color: "#777" },
  activeTabText: { fontWeight: "bold", color: "#000" },

  list: { paddingHorizontal: 21, paddingBottom: 30 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffb3",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
  },
  icon: { width: 60, height: 60, marginRight: 10, borderRadius: 10 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#000" },
  cardTime: { fontSize: 13, color: "#555", marginTop: 5 },
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
    borderRadius: 10,
    padding: 10,
  },
  closeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
