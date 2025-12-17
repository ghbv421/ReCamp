import React, { useState, useRef, useCallback } from "react";
import {
  View, Text, FlatList, TouchableOpacity, Image, ImageBackground, Animated, StyleSheet, Dimensions, PanResponder, ScrollView, Alert, ActivityIndicator
} from "react-native";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { reservationAPI } from "../../services/api"; 
import { Ionicons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Reservation() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const bottomSheetAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      loadReservations();
    }, [])
  );

  const loadReservations = async () => {
    try {
      setLoading(true);
      if (reservationAPI && reservationAPI.getAll) {
        const { data } = await reservationAPI.getAll();
        setReservations(data || []);
      }
    } catch (error) {
      console.log("Error loading reservations", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Helper to ensure ID starts with RCP
  const getTransactionId = (id: string) => {
    if (id && String(id).startsWith('RCP')) return id;
    return `RCP${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const cancelReservation = async (item: any) => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this booking? It will be moved to your Transaction History.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              // ✅ Ensure we use an RCP ID
              const finalId = getTransactionId(item._id);

              const cancelledItem = {
                ...item,
                status: "Cancelled",
                cancelledAt: new Date().toISOString(),
                title: item.campName,
                image: item.imageUrl ? { uri: item.imageUrl } : null,
                transactionId: finalId, // Use the fixed ID
                totalPrice: item.totalPrice,
                customer: item.customerName,
                contact: item.contactNumber,
                reservationDate: item.checkInDate, 
                stayDuration: `${item.nights} nights`
              };

              const storedCancelled = await AsyncStorage.getItem("@cancelled");
              const cancelledList = storedCancelled ? JSON.parse(storedCancelled) : [];
              cancelledList.push(cancelledItem);
              await AsyncStorage.setItem("@cancelled", JSON.stringify(cancelledList));

              if (reservationAPI && reservationAPI.delete) {
                await reservationAPI.delete(item._id);
                setReservations(prev => prev.filter((r) => r._id !== item._id));
                closeBottomSheet();
                Alert.alert("Cancelled", `Reservation ${finalId} moved to history.`);
              }
            } catch (e) {
              console.log("Cancellation Error:", e);
              Alert.alert("Error", "Could not cancel reservation.");
            }
          },
        },
      ]
    );
  };

  const openBottomSheet = (item: any) => {
    setSelectedItem(item);
    Animated.timing(bottomSheetAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(bottomSheetAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => setSelectedItem(null));
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 10,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) bottomSheetAnim.setValue(1 - gestureState.dy / SCREEN_HEIGHT);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 150) closeBottomSheet();
      else Animated.timing(bottomSheetAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    },
  });

  const sheetTranslateY = bottomSheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.1],
  });

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} onPress={() => openBottomSheet(item)}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.listImage} />
      ) : (
        <View style={styles.iconContainer}>
          <Ionicons name="image-outline" size={24} color="#fff" />
        </View>
      )}

      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.campName || "Camping Spot"}</Text>
        <Text style={styles.cardSubtitle}><Text style={{ fontWeight: "700" }}>Check-in: </Text>{item.checkInDate}</Text>
        <Text style={styles.cardSubtitle}>{item.checkInTime}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require("../../assets/images/dashboardbg.png")} style={{ flex: 1 }}>
      <View style={{ paddingTop: 60, paddingBottom: 10, alignItems: "center" }}>
        <Text style={styles.headerTitle}>My Reservations</Text>
        <View style={styles.headerLine} />
      </View>

      {loading ? (
         <ActivityIndicator size="large" color="#fff" style={{marginTop: 50}} />
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Ionicons name="list-outline" size={60} color="#ddd" />
                <Text style={{ textAlign: "center", marginTop: 10, color: "#fff", fontSize: 16 }}>No reservations found.</Text>
            </View>
          }
        />
      )}

      {selectedItem && (
        <>
          <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeBottomSheet} />
          <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: sheetTranslateY }] }]} {...panResponder.panHandlers}>
            <View style={styles.dragHandle} />
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              {selectedItem.imageUrl ? (
                <Image source={{ uri: selectedItem.imageUrl }} style={styles.bannerImage} />
              ) : null}
              <Text style={styles.sheetTitle}>{selectedItem.campName}</Text>
              
              <View style={styles.detailRow}>
                 <Text style={styles.detailLabel}>Booking ID:</Text>
                 {/* ✅ Display ID checking if it starts with RCP */}
                 <Text style={styles.detailValue}>
                    {selectedItem._id && String(selectedItem._id).startsWith('RCP') 
                        ? selectedItem._id 
                        : (selectedItem._id ? `RCP${selectedItem._id.substring(0,6).replace('.','')}` : 'N/A')}
                 </Text>
              </View>
              
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Customer:</Text><Text style={styles.detailValue}>{selectedItem.customerName}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Contact:</Text><Text style={styles.detailValue}>{selectedItem.contactNumber}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Check-In:</Text><Text style={styles.detailValue}>{selectedItem.checkInDate}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Check-Out:</Text><Text style={styles.detailValue}>{selectedItem.checkOutDate}</Text></View>
              <View style={styles.detailRow}><Text style={styles.detailLabel}>Guests:</Text><Text style={styles.detailValue}>{selectedItem.guests} pax</Text></View>
              <View style={styles.detailRow}>
                 <Text style={styles.detailLabel}>Total Price:</Text>
                 <Text style={[styles.detailValue, { color: '#FF5A5F', fontWeight: 'bold' }]}>
                    ₱{selectedItem.totalPrice ? Number(selectedItem.totalPrice).toFixed(2) : '0.00'}
                 </Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.closeBtn} onPress={closeBottomSheet}><Text style={styles.btnText}>Close</Text></TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelReservation(selectedItem)}><Text style={styles.btnText}>Cancel Reservation</Text></TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#fff", textShadowColor: 'rgba(0,0,0,0.3)', textShadowRadius: 3 },
  headerLine: { height: 2, backgroundColor: "#fff", width: "80%", alignSelf: "center", marginTop: 10, borderRadius: 1, opacity: 0.5 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 15, padding: 15, marginBottom: 12, elevation: 3 },
  listImage: { width: 60, height: 60, borderRadius: 10, marginRight: 15, backgroundColor: '#eee' },
  bannerImage: { width: '100%', height: 180, borderRadius: 12, marginBottom: 20, backgroundColor: '#eee' },
  iconContainer: { width: 60, height: 60, borderRadius: 10, backgroundColor: '#83492B', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardSubtitle: { fontSize: 13, color: "#666", marginTop: 4 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)" },
  bottomSheet: { position: "absolute", left: 0, right: 0, top: 0, height: SCREEN_HEIGHT * 0.9, backgroundColor: "#fff", borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 10 },
  dragHandle: { width: 40, height: 5, backgroundColor: '#ccc', borderRadius: 2.5, alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: '#333', marginBottom: 20 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  detailLabel: { fontWeight: '700', color: '#000', fontSize: 16 },
  detailValue: { fontWeight: '500', color: '#333', fontSize: 16 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", gap: 10, marginTop: 25 },
  closeBtn: { flex: 1, backgroundColor: "#E38B29", paddingVertical: 14, borderRadius: 25, alignItems: "center" },
  cancelBtn: { flex: 1, backgroundColor: "#C75B12", paddingVertical: 14, borderRadius: 25, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
});