import React, { useState, useCallback } from "react";
import {
  View, Text, TouchableOpacity, FlatList, Modal, Image, ImageBackground, StyleSheet, ScrollView, Alert, Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

const formatDateTime = (dateString: string | undefined, includeTime = true) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  const options: Intl.DateTimeFormatOptions = {
    month: "short", day: "numeric", year: "numeric",
    hour: includeTime ? "numeric" : undefined, minute: includeTime ? "2-digit" : undefined,
  };
  return date.toLocaleString("en-US", options);
};

export default function Transact() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Past");
  const [completed, setCompleted] = useState<any[]>([]);
  const [cancelled, setCancelled] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      if (params.tab) setActiveTab(params.tab as string);
    }, [params.tab])
  );

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

  const deleteSingleCancelled = async (transactionId: string) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: async () => {
          try {
            const updatedCancelled = cancelled.filter((item) => item.transactionId !== transactionId);
            await AsyncStorage.setItem("@cancelled", JSON.stringify(updatedCancelled));
            setCancelled(updatedCancelled);
            setModalVisible(false);
          } catch (e) { console.log(e); }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
      {item.image ? (
        <Image source={item.image} style={styles.icon} />
      ) : (
        <View style={styles.iconPlaceholder}><Ionicons name="receipt-outline" size={24} color="#fff" /></View>
      )}
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title || "Unknown Transaction"}</Text>
        {/* ✅ Display RCP ID */}
        <Text style={styles.cardSubtitle}>ID: {item.transactionId || "N/A"}</Text>
        
        {item.status === "Cancelled" && item.cancelledAt && (
          <Text style={styles.cancelledTime}>Cancelled: {formatDateTime(item.cancelledAt)}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  const currentData = activeTab === "Past" ? completed : cancelled;

  return (
    <ImageBackground source={require("../../assets/images/dashboardbg.png")} style={styles.background} resizeMode="cover">
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Transaction History</Text>
        <View style={styles.tabContainer}>
          {["Past", "Cancelled"].map((tab) => (
            <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={currentData}
        keyExtractor={(item, index) => item.transactionId || `key-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Ionicons name="folder-open-outline" size={48} color="#666" />
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} transactions.</Text>
          </View>
        }
      />

      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedItem && (
              <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                {selectedItem.image ? (
                  <Image source={selectedItem.image} style={styles.modalImage} />
                ) : (
                  <View style={[styles.modalImage, { backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }]}>
                     <Ionicons name="image-outline" size={50} color="#888" />
                  </View>
                )}
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <View style={styles.modalContent}>
                  <Text style={styles.infoText}><Text style={styles.label}>Transaction ID: </Text>{selectedItem.transactionId}</Text>
                  <Text style={styles.infoText}><Text style={styles.label}>Customer: </Text>{selectedItem.customer}</Text>
                  <Text style={styles.infoText}><Text style={styles.label}>Contact: </Text>{selectedItem.contact}</Text>
                  <Text style={styles.infoText}><Text style={styles.label}>Check-In: </Text>{selectedItem.reservationDate || "N/A"}</Text>
                  <Text style={styles.infoText}><Text style={styles.label}>Duration: </Text>{selectedItem.stayDuration}</Text>
                  <Text style={[styles.infoText, { marginTop: 5 }]}>
                    <Text style={styles.label}>Total Amount: </Text>
                    <Text style={{ color: '#C0392B', fontWeight: 'bold' }}>₱{selectedItem.totalPrice ? Number(selectedItem.totalPrice).toFixed(2) : '0.00'}</Text>
                  </Text>
                  {selectedItem.cancelledAt && (
                     <Text style={[styles.infoText, { marginTop: 10, fontStyle: 'italic', color: '#555' }]}>
                        Cancelled on: {formatDateTime(selectedItem.cancelledAt)}
                     </Text>
                  )}
                </View>

                {activeTab === "Cancelled" ? (
                  <TouchableOpacity style={[styles.closeBtn, { backgroundColor: "#C0392B" }]} onPress={() => deleteSingleCancelled(selectedItem.transactionId)}>
                    <Text style={styles.btnText}>Delete History</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
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
  background: { flex: 1, width: "100%", height: "100%" },
  header: { paddingTop: 60, paddingBottom: 10, alignItems: "center" },
  backButton: { position: "absolute", left: 20, top: 60 },
  title: { fontSize: 26, fontWeight: "700", color: "#111", marginBottom: 10 },
  tabContainer: { flexDirection: "row", width: screenWidth, borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.3)" },
  tab: { flex: 1, alignItems: "center", paddingVertical: 10 },
  tabText: { fontSize: 16, fontWeight: "600", color: "#666" },
  activeTabText: { color: "#000", fontWeight: "bold" },
  activeTab: { borderBottomWidth: 3, borderBottomColor: "#000" },
  listContainer: { paddingHorizontal: 20, paddingBottom: 50, paddingTop: 10 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 16, padding: 14, marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  icon: { width: 60, height: 60, borderRadius: 10, marginRight: 15, backgroundColor: '#eee' },
  iconPlaceholder: { width: 60, height: 60, borderRadius: 10, marginRight: 15, backgroundColor: '#888', justifyContent: 'center', alignItems: 'center' },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: "600", color: "#000" },
  cardSubtitle: { fontSize: 13, color: "#777", marginTop: 3 },
  cancelledTime: { fontSize: 12, color: "#C0392B", marginTop: 2, fontStyle: 'italic' },
  emptyText: { textAlign: "center", color: "#444", marginTop: 10, fontSize: 16 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000099" },
  modalContainer: { width: "90%", backgroundColor: "#fff", borderRadius: 20, padding: 20 },
  modalImage: { width: "100%", height: 180, borderRadius: 15, marginBottom: 15, backgroundColor: '#eee' },
  modalTitle: { fontSize: 22, fontWeight: "700", color: "#000", marginBottom: 15, textAlign: 'center' },
  modalContent: { width: "100%", padding: 10, marginBottom: 15, backgroundColor: '#f9f9f9', borderRadius: 10 },
  label: { fontWeight: "700", color: "#000" },
  infoText: { color: "#333", fontSize: 16, marginBottom: 6 },
  closeBtn: { width: "100%", backgroundColor: "#E38B29", padding: 12, borderRadius: 25, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});