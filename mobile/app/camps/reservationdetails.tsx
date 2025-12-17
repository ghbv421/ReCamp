import React, { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Alert, ActivityIndicator, Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
// @ts-ignore
import { reservationAPI } from "../../services/api"; 

export default function ReservationDetails() {
  const router = useRouter();
  const params = useLocalSearchParams() as any;
  const [reservation, setReservation] = useState(params);
  const [submitting, setSubmitting] = useState(false);

  const handleDone = async () => {
    setSubmitting(true);
    try {
      await reservationAPI.create({
        campId: reservation.campId,
        campName: reservation.title,
        // ✅ CRITICAL FIX: Save the image URL to the database!
        imageUrl: reservation.imageUrl,
        customerName: reservation.customer,
        contactNumber: reservation.contact,
        paymentMethod: reservation.payment,
        checkInDate: reservation.checkInDate,
        checkInTime: reservation.checkInTime,
        checkOutDate: reservation.checkOutDate,
        checkOutTime: reservation.checkOutTime,
        guests: reservation.guest,
        nights: reservation.nights,
        totalPrice: reservation.totalPrice,
        status: 'Confirmed'
      });

      Alert.alert("Success", "Booking Confirmed!");
      router.push("/dashboard/home");
    } catch (e) {
      console.log("Error saving reservation:", e);
      Alert.alert("Error", "Could not save reservation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.header}>Review Details</Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => router.back()} 
          >
            <Ionicons name="pencil" size={22} color="#fff" />
          </TouchableOpacity>

          {/* ✅ SHOW IMAGE PREVIEW HERE TOO */}
          {reservation.imageUrl && (
            <Image source={{ uri: reservation.imageUrl }} style={styles.previewImage} />
          )}

          <Text style={styles.campTitle}>{reservation.title}</Text>

          <View style={styles.info}>
            <Text style={styles.infoText}><Text style={styles.label}>Customer: </Text>{reservation.customer}</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Contact: </Text>{reservation.contact}</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Stay Duration: </Text>{reservation.stayDuration}</Text>
            
            <View style={styles.divider} />

            <Text style={styles.infoText}><Text style={styles.label}>Check-In: </Text>{reservation.checkInDate} @ {reservation.checkInTime}</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Check-Out: </Text>{reservation.checkOutDate} @ {reservation.checkOutTime}</Text>

            <View style={styles.divider} />

            <Text style={styles.infoText}><Text style={styles.label}>Guest(s): </Text>{reservation.guest}</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Payment: </Text>{reservation.payment}</Text>
            
            <Text style={[styles.infoText, { marginTop: 10, fontSize: 18, color: '#FF5A5F' }]}>
              <Text style={styles.label}>Total Price: </Text>
              ₱{Number(reservation.totalPrice).toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={handleDone} disabled={submitting}>
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.doneText}>Confirm & Book</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  backButton: {
    position: "absolute", top: 50, left: 20, zIndex: 2,
    backgroundColor: "#00000060", padding: 8, borderRadius: 50,
  },
  header: {
    marginTop: 60, textAlign: "center", fontSize: 26,
    fontWeight: "bold", marginVertical: 20, color: "#fff",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20, padding: 30, marginTop: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6
  },
  previewImage: { width: '100%', height: 150, borderRadius: 10, marginBottom: 15 },
  campTitle: {
    fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: '#333'
  },
  info: { marginTop: 10 },
  infoText: { fontSize: 16, color: "#333", marginBottom: 8 },
  label: { fontWeight: "bold", color: '#555' },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  doneButton: {
    backgroundColor: "#f28c28", paddingVertical: 15,
    borderRadius: 30, marginTop: 30, alignItems: "center",
  },
  doneText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  editIcon: {
    position: "absolute", top: 20, right: 20,
    backgroundColor: "#4CAF50", padding: 8, borderRadius: 20, zIndex: 2,
  },
});