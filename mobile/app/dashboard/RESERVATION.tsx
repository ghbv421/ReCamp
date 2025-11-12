import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Reservation() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const bottomSheetAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      if (gestureState.dy > 150) closeBottomSheet();
      else {
        Animated.timing(bottomSheetAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const formatDateTime = (value?: string | Date) => {
    if (!value) return "N/A";
    let date: Date;
    if (value instanceof Date) date = value;
    else {
      const parsed = Date.parse(value);
      if (isNaN(parsed)) return "N/A";
      date = new Date(parsed);
    }
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
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
              const cancelledAt = new Date().toISOString();
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
              const cancelledList = storedCancelled ? JSON.parse(storedCancelled) : [];
              cancelledList.push(cancelledItem);
              await AsyncStorage.setItem("@cancelled", JSON.stringify(cancelledList));

              closeBottomSheet();
            } catch (e) {
              console.log("Error cancelling reservation:", e);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => openBottomSheet(item)}>
      <Image source={item.image} style={styles.icon} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>
          <Text style={{ fontWeight: "700" }}>Reservation Date: </Text>
          {formatDateTime(item.reservationDate)}
        </Text>
        <Text style={styles.cardSubtitle}>
          <Text style={{ fontWeight: "700" }}>Check-In | Check-Out: </Text>
          {formatDateTime(item.checkInTime)} - {formatDateTime(item.checkOutTime)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const sheetTranslateY = bottomSheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.1],
  });

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={{ flex: 1 }}
    >
      {/* Header with line */}
      <View style={{ paddingTop: 40, paddingBottom: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 28, fontWeight: "800", color: "#000", marginTop: 30 }}>Reservation</Text>
        <View style={styles.headerLine} />
      </View>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.transactionId}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, paddingBottom: 50 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50 }}>No reservations yet.</Text>
        }
      />

      {selectedItem && (
        <>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#00000055",
            }}
            activeOpacity={1}
            onPress={closeBottomSheet}
          />

          <Animated.View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: SCREEN_HEIGHT * 0.9,
              backgroundColor: "#fff",
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              padding: 20,
              transform: [{ translateY: sheetTranslateY }],
            }}
            {...panResponder.panHandlers}
          >
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Image
                source={selectedItem.image}
                style={{ width: "100%", height: 180, borderRadius: 15, marginBottom: 10 }}
              />
              <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 10, textAlign: "center" }}>
                {selectedItem.title}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 6 }}>
                Transaction ID: {selectedItem.transactionId}
              </Text>

              {[
                ["Reservation Date", formatDateTime(selectedItem.reservationDate)],
                ["Check-In", formatDateTime(selectedItem.checkInTime)],
                ["Check-Out", formatDateTime(selectedItem.checkOutTime)],
                ["Customer", selectedItem.customer],
                ["Contact", selectedItem.contact],
                ["Stay Duration", selectedItem.stayDuration],
                ["Guest", selectedItem.guest],
                ["Payment", selectedItem.payment],
              ].map(([label, value]) => (
                <View
                  key={label}
                  style={{ borderBottomWidth: 0.5, borderBottomColor: "#ccc", marginBottom: 6, paddingBottom: 4 }}
                >
                  <Text style={{ fontSize: 16 }}>
                    <Text style={{ fontWeight: "700" }}>{label}: </Text>
                    {value || "N/A"}
                  </Text>
                </View>
              ))}

              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, marginTop: 15 }}>
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: "#E38B29", paddingVertical: 12, borderRadius: 25, alignItems: "center" }}
                  onPress={closeBottomSheet}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: "#C75B12", paddingVertical: 12, borderRadius: 25, alignItems: "center" }}
                  onPress={() => cancelReservation(selectedItem)}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>Cancel Reservation</Text>
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
  headerLine: {
    height: 1,
    backgroundColor: "#000000ff",
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 1,
  },
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
});
