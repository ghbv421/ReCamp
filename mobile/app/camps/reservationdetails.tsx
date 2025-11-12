import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReservationDetails() {
  const router = useRouter();
  const params = useLocalSearchParams() as any;

  const [reservation, setReservation] = useState(params);

  const generateTransactionId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 900 + 100);
    return `TXC-${timestamp}${random}`;
  };

  const handleDone = async () => {
    try {
      const stored = await AsyncStorage.getItem("@reservations");
      const reservations = stored ? JSON.parse(stored) : [];

      const newReservation = {
        ...reservation,
        transactionId: generateTransactionId(),
        reservationDate: new Date().toISOString(), // current date
        checkInTime: reservation.checkInTime,      // make sure this is ISO string
        checkOutTime: reservation.checkOutTime,    // make sure this is ISO string
      };

      // Add new reservation
      const updatedReservations = [...reservations, newReservation];

      await AsyncStorage.setItem(
        "@reservations",
        JSON.stringify(updatedReservations)
      );

      router.push("/dashboard/home");
    } catch (e) {
      console.log("Error saving reservation:", e);
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

        <Text style={styles.header}>Reservation Details</Text>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() =>
              router.push({
                pathname: "/camps/addreservation",
                params: reservation,
              })
            }
          >
            <Ionicons name="pencil" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.campTitle}>{reservation.title}</Text>

          <View style={styles.info}>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Customer: </Text>
              {reservation.customer || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Contact: </Text>
              {reservation.contact || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Stay Duration: </Text>
              {reservation.stayDuration || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Check-In: </Text>
              {reservation.checkInTime
                ? formatDateTime(reservation.checkInTime)
                : "N/A"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Check-Out: </Text>
              {reservation.checkOutTime
                ? formatDateTime(reservation.checkOutTime)
                : "N/A"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Guest(s): </Text>
              {reservation.guest || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Payment: </Text>
              {reservation.payment || "N/A"}
            </Text>
          </View>

          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// Helper function
const formatDateTime = (value?: string | Date) => {
  if (!value) return "N/A";
  let date: Date;
  if (value instanceof Date) {
    date = value;
  } else {
    const parsed = Date.parse(value);
    if (isNaN(parsed)) return "N/A";
    date = new Date(parsed);
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };
  return date.toLocaleString("en-US", options);
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },
  backButton: {
    position: "absolute",
    top: 70,
    left: 25,
    zIndex: 2,
    backgroundColor: "#00000060",
    padding: 6,
    borderRadius: 50,
  },
  header: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#000",
  },
  card: {
    backgroundColor: "#ffffffcc",
    borderRadius: 20,
    padding: 40,
    marginTop: 100,
  },
  campTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  info: { marginTop: 50 },
  infoText: { fontSize: 16, color: "#000", marginBottom: 6 },
  label: { fontWeight: "bold" },
  doneButton: {
    backgroundColor: "#f28c28",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },
  doneText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  editIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 20,
    zIndex: 2,
  },
});
