import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  Dimensions,
  PanResponder,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Reservation() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const bottomSheetAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const loadReservations = async () => {
      const stored = await AsyncStorage.getItem("@reservations");
      setReservations(stored ? JSON.parse(stored) : []);
    };
    loadReservations();
  }, []);

  const openBottomSheet = (item: any) => {
    setSelectedItem(item);
    Animated.timing(bottomSheetAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(bottomSheetAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedItem(null));
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        bottomSheetAnim.setValue(1 - gestureState.dy / SCREEN_HEIGHT);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 150) {
        closeBottomSheet();
      } else {
        Animated.timing(bottomSheetAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const formatDateTime = (dateStr: string, timeStr: string) => {
    if (!dateStr || !timeStr) return "N/A";
    const date = new Date(`${dateStr}T${timeStr}`);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => openBottomSheet(item)}>
      <Image source={item.image} style={styles.icon} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardSubtitle}>
          Reservation Date:{" "}
          {item.reservationDate
            ? formatDateTime(item.reservationDate, item.checkInTime)
            : "N/A"}
        </Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>
          {item.checkInTime && item.checkOutTime
            ? `${formatDateTime(item.reservationDate, item.checkInTime)} - ${formatDateTime(item.reservationDate, item.checkOutTime)}`
            : "No date info"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const sheetTranslateY = bottomSheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.1], // 90% height
  });

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Reservations</Text>
        <View style={styles.headerLine} />
      </View>

      {/* Reservation List */}
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.transactionId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No reservations yet.</Text>
        }
      />

      {/* Bottom Sheet */}
      {selectedItem && (
        <>
          <TouchableOpacity
            style={styles.dimBackground}
            activeOpacity={1}
            onPress={closeBottomSheet}
          />
          <Animated.View
            style={[styles.bottomSheet, { transform: [{ translateY: sheetTranslateY }] }]}
            {...panResponder.panHandlers}
          >
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
              <Image source={selectedItem.image} style={styles.sheetImage} />
              <Text style={styles.sheetTitle}>{selectedItem.title}</Text>

              <View style={styles.sheetInfo}>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>Reservation ID: </Text>
                  {selectedItem.transactionId}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>Reservation Date: </Text>
                  {formatDateTime(selectedItem.reservationDate, selectedItem.checkInTime)}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>Check-In / Out: </Text>
                  {formatDateTime(selectedItem.reservationDate, selectedItem.checkInTime)} -{" "}
                  {formatDateTime(selectedItem.reservationDate, selectedItem.checkOutTime)}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>Guests: </Text>
                  {selectedItem.guest || "N/A"}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>Payment: </Text>
                  {selectedItem.payment || "N/A"}
                </Text>
              </View>

              <View style={styles.sheetButtons}>
                <TouchableOpacity
                  style={[styles.sheetBtn, styles.closeBtn]}
                  onPress={closeBottomSheet}
                >
                  <Text style={styles.btnText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.sheetBtn, styles.cancelBtn]}
                  onPress={async () => {
                    const updated = reservations.filter(
                      (r) => r.transactionId !== selectedItem.transactionId
                    );
                    await AsyncStorage.setItem("@reservations", JSON.stringify(updated));
                    setReservations(updated);
                    closeBottomSheet();
                  }}
                >
                  <Text style={styles.btnText}>Cancel Reservation</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  header: { paddingTop: 50, paddingBottom: 10, alignItems: "center" },
  title: { fontSize: 30, fontWeight: "800", color: "#000", marginTop: 20 },
  headerLine: {
    height: 1,
    backgroundColor: "#000000ff",
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 1,
  },
  listContainer: { padding: 20, paddingBottom: 40 },
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
  cardTitle: { fontSize: 21, fontWeight: "600", color: "#000" },
  cardSubtitle: { fontSize: 13, color: "#666", marginTop: 4 },
  emptyText: { textAlign: "center", color: "#555", marginTop: 50, fontSize: 16 },
  dimBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#00000055",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    top: SCREEN_HEIGHT * 0.1, // 90% height
    height: SCREEN_HEIGHT * 0.9,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    elevation: 10,
  },
  sheetImage: { width: "100%", height: 180, borderRadius: 15, marginBottom: 10 },
  sheetTitle: { fontSize: 22, fontWeight: "700", marginBottom: 10, textAlign: "center" },
  sheetInfo: { marginBottom: 15 },
  label: { fontWeight: "700" },
  infoText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 4,
  },
  sheetButtons: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  sheetBtn: { flex: 1, paddingVertical: 12, borderRadius: 25, alignItems: "center" },
  closeBtn: { backgroundColor: "#E38B29" },
  cancelBtn: { backgroundColor: "#C75B12" },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
