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
  const [tab, setTab] = useState<"Past" | "Cancelled">("Past");
  const [selected, setSelected] = useState<any>(null);

  const data = {
    Past: [
      {
        title: "Camp Hapitanan — Checked Out",
        time: "09-30-25 • 9:46 AM",
        image: require("../../assets/images/Hapitanan.png"),
        details: {
          "Reservation Date": "",
          Customer: "",
          Contact: "+63",
          "Stay Duration": "",
          "Check-in": "",
          "Check-out": "",
          Guests: 5,
          "Pay at Counter": "",
          "Transaction ID": "",
          Status: "",
        },
      },
    ],
    Cancelled: [
      {
        title: "Little Baguio — Booking Cancelled",
        time: "09-29-25 • 2:30 PM",
        image: require("../../assets/images/Lilbaguio.png"),
        details: {
          "Reservation Date": "",
          Customer: "",
          Contact: "+63",
          "Stay Duration": "",
          "Check-in": "",
          "Check-out": "",
          "Pay at Counter": "",
          "Transaction ID": "",
          Status: "",
        },
      },
    ],
  };

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.bg}
    >
      <Text style={styles.header}>Transaction History</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(["Past", "Cancelled"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tab, tab === t && styles.active]}
          >
            <Text style={[styles.tabText, tab === t && styles.activeText]}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction list */}
      <FlatList
        data={data[tab]}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelected(item)}
          >
            <Image source={item.image} style={styles.cardImg} />
            <View>
              <Text
                style={[
                  styles.cardTitle,
                  item.title.includes("Cancelled") && styles.cancel,
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.cardTime,
                  item.title.includes("Cancelled") && styles.cancel,
                ]}
              >
                {item.time}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ width: "90%" }}
      />

      {/* Modal */}
      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {selected && (
              <ScrollView>
                <Image source={selected.image} style={styles.detailImg} />
                <Text style={styles.modalTitle}>Transaction Details</Text>
                {Object.entries(selected.details).map(([k, v]) => (
                  <Text key={k} style={styles.detail}>
                    <Text style={styles.label}>{k}: </Text>
                    {String(v)}
                  </Text>
                ))}
              </ScrollView>
            )}
            <Pressable
              style={styles.closeBtn}
              onPress={() => setSelected(null)}
            >
              <Text style={styles.closeTxt}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, alignItems: "center" },
  header: { fontSize: 26, fontWeight: "bold", color: "#000", marginTop: 50 },
  tabs: { flexDirection: "row", width: "90%", marginVertical: 15 },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  active: { borderBottomColor: "#000" },
  tabText: { fontSize: 18, color: "#777" },
  activeText: { color: "#000", fontWeight: "bold" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffcc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  cardImg: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#000" },
  cardTime: { fontSize: 13, color: "#555" },
  cancel: { color: "#888" },
  overlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  detailImg: { width: "100%", height: 180, borderRadius: 10, marginBottom: 15 },
  detail: { fontSize: 14, marginBottom: 6 },
  label: { fontWeight: "bold" },
  closeBtn: {
    marginTop: 15,
    backgroundColor: "#fb9333ff",
    borderRadius: 8,
    paddingVertical: 10,
  },
  closeTxt: { color: "#060606ff", textAlign: "center", fontWeight: "600" },
});
