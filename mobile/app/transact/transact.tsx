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
        "Reservation Date": "",
        Customer: "",
        Contact: "",
        "Stay Duration": "",
        "Check-In": "",
        "Check-Out": "",
        Guest: "",
        "Pay at Counter": "GCash",
        "Transaction ID": "0001ZXDVMLAZX094",
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
        "Reservation Date": "",
        Customer: "",
        Contact: "",
        "Stay Duration": "",
        "Check-In": "",
        "Check-Out": "",
        Guest: "",
        "Date Cancelled": "",
        "Pay at Counter": "GCash",
        "Transaction ID": "0001ZXDVMLAZX094",
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
  activeTab: {
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 18,
    color: "#777777",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#000",
  },

  list: {
    paddingHorizontal: 21,
    paddingBottom: 30,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffbb",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#000" },
  cardTime: { fontSize: 13, color: "#555555ff", marginTop: 5 },
  cancelled: { color: "#888888" },

  overlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#ffffffd9", // subtle white transparency
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#00000014",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 10,
    color: "#1a1a1a",
  },
  detailImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 6,
    color: "#1a1a1a",
    lineHeight: 20,
  },
  label: { fontWeight: "bold", color: "#000" },

  closeBtn: {
    marginTop: 20,
    backgroundColor: "#ED8E45", // orange close button
    borderRadius: 10,
    paddingVertical: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  closeText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "700",
  },
});
