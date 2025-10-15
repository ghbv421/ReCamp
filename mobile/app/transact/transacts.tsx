import React, { useState, useEffect } from "react";
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
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function Transact() {
  const [activeTab, setActiveTab] = useState("Past");
  const [completed, setCompleted] = useState<any[]>([]);
  const [cancelled, setCancelled] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.tab) setActiveTab(params.tab as string);
  }, [params]);

  const loadTransactions = async () => {
    try {
      const storedCompleted = await AsyncStorage.getItem("@completed");
      const storedCancelled = await AsyncStorage.getItem("@cancelled");
      if (storedCompleted) setCompleted(JSON.parse(storedCompleted));
      if (storedCancelled) setCancelled(JSON.parse(storedCancelled));
    } catch (e) {
      console.log("Error loading transactions:", e);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

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
        <Text style={styles.cardSubtitle}>
          {item.status} • {item.dateTime}
        </Text>
        {item.status === "Cancelled" && item.cancelledAt && (
          <Text style={styles.cancelledTime}>
            Cancelled at {item.cancelledAt}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const deleteSingleCancelled = async (transactionId: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this cancelled transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedCancelled = cancelled.filter(
                (item) => item.transactionId !== transactionId
              );
              await AsyncStorage.setItem(
                "@cancelled",
                JSON.stringify(updatedCancelled)
              );
              setCancelled(updatedCancelled);
              setModalVisible(false);
              Alert.alert("Deleted", "Cancelled transaction removed successfully!");
            } catch (e) {
              console.log("Error deleting cancelled transaction:", e);
            }
          },
        },
      ]
    );
  };

  const currentData = activeTab === "Past" ? completed : cancelled;

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["Past", "Cancelled"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
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
      </View>

      {/* Transaction List */}
      <FlatList
        data={currentData}
        keyExtractor={(item, index) =>
          item.transactionId ? item.transactionId : `key-${index}`
        }
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No {activeTab.toLowerCase()} transactions yet.
          </Text>
        }
      />

      {/* Modal */}
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
                {selectedItem.image && (
                  <Image source={selectedItem.image} style={styles.modalImage} />
                )}
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>

                <View style={styles.modalContent}>
                  <Text style={styles.infoText}>
                    <Text style={styles.label}>Transaction ID: </Text>
                    {selectedItem.transactionId}
                  </Text>

                  {Object.entries({
                    "Reservation Date": selectedItem.reservationDate,
                    Customer: selectedItem.customer,
                    Contact: selectedItem.contact,
                    "Stay Duration": selectedItem.stayDuration,
                    "Check-In": selectedItem.checkInTime,
                    "Check-Out": selectedItem.checkOutTime,
                    Guest: selectedItem.guest,
                    Payment: selectedItem.payment,
                    Status: selectedItem.status,
                    ...(selectedItem.cancelledAt
                      ? { "Cancelled At": selectedItem.cancelledAt }
                      : {}),
                  }).map(([label, value]) => (
                    <Text key={label} style={styles.infoText}>
                      <Text style={styles.label}>{label}: </Text>
                      {value || "N/A"}
                    </Text>
                  ))}
                </View>

                {activeTab === "Cancelled" ? (
                  <TouchableOpacity
                    style={[styles.closeBtn, { backgroundColor: "#C0392B" }]}
                    onPress={() =>
                      deleteSingleCancelled(selectedItem.transactionId)
                    }
                  >
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.btnText}>Close</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    width: screenWidth,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.3)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888",
  },
  activeTabText: {
    color: "#000",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#000",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },
  cancelledTime: {
    fontSize: 12,
    color: "#C0392B",
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    color: "#444",
    marginTop: 40,
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#ffffffcc",
    borderRadius: 20,
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
    padding: 10,
    marginBottom: 15,
  },
  label: { fontWeight: "700", color: "#000" },
  infoText: { color: "#000", fontSize: 16, marginBottom: 6 },
  closeBtn: {
    width: "100%",
    backgroundColor: "#E38B29",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
