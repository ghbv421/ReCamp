<<<<<<< Updated upstream
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Reservation() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Upcoming");

  useFocusEffect(
    useCallback(() => {
      const loadReservations = async () => {
        try {
          const stored = await AsyncStorage.getItem("@reservations");
          let parsed = stored ? JSON.parse(stored) : [];

          parsed = parsed.map((res: any) => {
            if (!res.transactionId) {
              return { ...res, transactionId: generateTransactionId() };
            }
            return res;
          });

          await AsyncStorage.setItem("@reservations", JSON.stringify(parsed));
          setReservations(parsed);
        } catch (e) {
          console.log("Error loading reservations:", e);
        }
      };
      loadReservations();
    }, [])
  );

  const generateTransactionId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 900 + 100);
    return `TXC${timestamp}${random}`;
  };

  const cancelReservation = async (item: any) => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this reservation?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              const cancelledAt = new Date().toLocaleString();
              const cancelledItem = { ...item, status: "Cancelled", cancelledAt };

              const updatedReservations = reservations.filter(
                (r) => r.transactionId !== item.transactionId
              );

              await AsyncStorage.setItem(
                "@reservations",
                JSON.stringify(updatedReservations)
              );
              setReservations(updatedReservations);

              const storedCancelled = await AsyncStorage.getItem("@cancelled");
              const cancelledList = storedCancelled
                ? JSON.parse(storedCancelled)
                : [];
              cancelledList.push(cancelledItem);
              await AsyncStorage.setItem(
                "@cancelled",
                JSON.stringify(cancelledList)
              );

              setModalVisible(false);
              Alert.alert("Cancelled", "Reservation has been moved to Cancelled.");
            } catch (e) {
              console.log("Error cancelling reservation:", e);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Image source={item.image} style={styles.icon} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>

        {/* Show reservation date + check-in/out time */}
        <Text style={styles.cardSubtitle}>
          {item.reservationDate
            ? `${item.reservationDate}${
                item.checkInTime && item.checkOutTime
                  ? ` | ${item.checkInTime} - ${item.checkOutTime}`
                  : ""
              }`
            : item.checkInTime && item.checkOutTime
            ? `${item.checkInTime} - ${item.checkOutTime}`
            : "No date info"}
        </Text>
=======
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground, Modal, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Reservation() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const stored = await AsyncStorage.getItem("@reservations");
        if (stored) setData(JSON.parse(stored));
      } catch (e) {
        console.log("Error loading reservations:", e);
      }
    };
    loadReservations();
  }, []);

  const cancelReservation = async (id: string) => {
    const updated = data.filter((item) => item.id !== id);
    setData(updated);
    await AsyncStorage.setItem("@reservations", JSON.stringify(updated));
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
      <Image source={item.image} style={styles.icon} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.reservationDate || "No Date"}</Text>
>>>>>>> Stashed changes
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require("../../assets/images/dashboardbg.png")} style={styles.background}>
      <View style={styles.header}>
<<<<<<< Updated upstream
        <Text style={styles.title}>Reservation</Text>

        {/* Upcoming tab only */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => setActiveTab("Upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "Upcoming" && styles.activeTabText,
              ]}
            >
              Upcoming
            </Text>
            <View
              style={[
                styles.tabLine,
                activeTab === "Upcoming" && styles.activeTabLine,
              ]}
            />
          </TouchableOpacity>
        </View>
=======
        <Text style={styles.title}>Reservations</Text>
>>>>>>> Stashed changes
      </View>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.transactionId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
<<<<<<< Updated upstream
        ListEmptyComponent={
          <Text style={styles.emptyText}>No reservations yet.</Text>
        }
      />

      {/* Modal */}
=======
      />

>>>>>>> Stashed changes
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedItem && (
              <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                <Image source={selectedItem.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>

                <View style={styles.modalContent}>
                  {Object.entries({
                    "Reservation Date": selectedItem.reservationDate,
                    Customer: selectedItem.customer,
                    Contact: selectedItem.contact,
                    "Stay Duration": selectedItem.stayDuration,
                    "Check-In": selectedItem.checkInTime,
                    "Check-Out": selectedItem.checkOutTime,
                    Guest: selectedItem.guest,
                    Payment: selectedItem.payment,
                  }).map(([label, value]) => (
                    <Text key={label} style={styles.infoText}>
<<<<<<< Updated upstream
                      <Text style={styles.label}>{label}: </Text>
                      {value || "N/A"}
=======
                      <Text style={styles.label}>{label}: </Text>{value || "N/A"}
>>>>>>> Stashed changes
                    </Text>
                  ))}
                </View>

                <View style={styles.modalButtons}>
<<<<<<< Updated upstream
                  <TouchableOpacity
                    style={[styles.modalButton, styles.closeButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.btnText}>Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => cancelReservation(selectedItem)}
                  >
                    <Text style={styles.btnText}>Cancel Reservation</Text>
=======
                  <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                    <Text style={styles.btnText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelReservation(selectedItem.id)}>
                    <Text style={styles.btnText}>Cancel</Text>
>>>>>>> Stashed changes
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
<<<<<<< Updated upstream
  header: { paddingTop: 50, paddingBottom: 10, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "600", color: "#000" },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  tabButton: { alignItems: "center", flex: 1 },
  tabText: { fontSize: 16, color: "#777", fontWeight: "500" },
  activeTabText: { color: "#000", fontWeight: "700" },
  tabLine: {
    marginTop: 6,
    height: 2,
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 2,
  },
  activeTabLine: { backgroundColor: "#000" },

  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffb3",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
  },
  icon: { width: 70, height: 70, marginRight: 18, borderRadius: 10 },
  cardTextContainer: { flex: 1 },
  cardTitle: {
    fontSize: 21,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    fontWeight: "400",
  },
  emptyText: { textAlign: "center", color: "#555", marginTop: 50, fontSize: 16 },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#ffffffcc",
    borderRadius: 24,
    padding: 15,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  modalContent: {
    width: "100%",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  label: { fontWeight: "700", color: "#000" },
  infoText: { color: "#000", fontSize: 16, marginBottom: 6 },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  closeButton: { backgroundColor: "#E38B29" },
  cancelButton: { backgroundColor: "#C75B12" },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
=======
  header: { paddingTop: 50, paddingBottom: 15, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "600", color: "#000" },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#ffffffb3", borderRadius: 15, padding: 18, marginBottom: 12 },
  icon: { width: 70, height: 70, marginRight: 18, borderRadius: 10 },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 21, fontWeight: "600", color: "#000" },
  cardSubtitle: { fontSize: 16, color: "#555", marginTop: 3 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000099" },
  modalContainer: { width: "90%", backgroundColor: "#ffffffcc", borderRadius: 24, padding: 15 },
  modalImage: { width: "100%", height: 200, borderRadius: 15, marginBottom: 10 },
  modalTitle: { fontSize: 22, fontWeight: "700", color: "#000", marginBottom: 10 },
  modalContent: { width: "100%", borderRadius: 15, padding: 15, marginBottom: 15 },
  label: { fontWeight: "700", color: "#000" },
  infoText: { color: "#000", fontSize: 16, marginBottom: 6 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 },
  closeBtn: { flex: 1, backgroundColor: "#E38B29", padding: 10, borderRadius: 20, alignItems: "center", marginRight: 10 },
  cancelBtn: { flex: 1, backgroundColor: "#C75B12", padding: 10, borderRadius: 20, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600" },
>>>>>>> Stashed changes
});
