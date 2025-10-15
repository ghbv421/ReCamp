<<<<<<< Updated upstream
import React, { useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> Stashed changes
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
<<<<<<< Updated upstream
  Image,
=======
>>>>>>> Stashed changes
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ReservationDetails() {
  const router = useRouter();
<<<<<<< Updated upstream
  const params = useLocalSearchParams() as any;

  // Use static reservation data passed via params
  const [reservation] = useState(params);

  const handleDone = async () => {
    try {
      // Load existing reservations
      const stored = await AsyncStorage.getItem("@reservations");
      const reservations = stored ? JSON.parse(stored) : [];

      // Check if reservation already exists
      const index = reservations.findIndex((r: any) => r.id === reservation.id);
      let updatedReservations = [];

      if (index >= 0) {
        // Update existing reservation
        updatedReservations = reservations.map((r: any) =>
          r.id === reservation.id ? reservation : r
        );
      } else {
        // Add new reservation
        updatedReservations = [...reservations, reservation];
      }

      // Save back to AsyncStorage
      await AsyncStorage.setItem(
        "@reservations",
        JSON.stringify(updatedReservations)
      );

      // Navigate back to home/dashboard
      router.push("/dashboard/home"); // adjust to your home route
    } catch (e) {
      console.log("Error saving reservation:", e);
    }
  };

=======
  const params = useLocalSearchParams() as {
    id?: string;
    title?: string;
    image?: any; // keep image here for saving
    reservationDate?: string;
    customer?: string;
    contact?: string;
    stayDuration?: string;
    checkInTime?: string;
    checkOutTime?: string;
    guest?: string;
    payment?: string;
  };

  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const saveReservation = async () => {
      try {
        const stored = await AsyncStorage.getItem("@reservations");
        const existing = stored ? JSON.parse(stored) : [];

        // Save both title and image
        const newReservation = {
          id: params.id || Date.now().toString(),
          title: params.title,      // Camp name
          image: params.image,      // Camp image for cards
          reservationDate: params.reservationDate,
          customer: params.customer,
          contact: params.contact,
          stayDuration: params.stayDuration,
          checkInTime: params.checkInTime,
          checkOutTime: params.checkOutTime,
          guest: params.guest,
          payment: params.payment,
        };

        const updated = [...existing, newReservation];

        setReservations(updated);
        await AsyncStorage.setItem("@reservations", JSON.stringify(updated));
      } catch (e) {
        console.log("Error saving reservation:", e);
      }
    };

    saveReservation();
  }, []);

>>>>>>> Stashed changes
  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
<<<<<<< Updated upstream
        {/* Back Button */}
=======
>>>>>>> Stashed changes
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.header}>Reservation Details</Text>

<<<<<<< Updated upstream
        <View style={styles.card}>
          {/* Floating Pencil Icon */}
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() =>
              router.push({
                pathname: "/camps/addreservation",
                params: reservation, // Pass the reservation for editing
              })
            }
          >
            <Ionicons name="pencil" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.campTitle}>{reservation.title}</Text>
=======
        {/* Show only camp name */}
        <View style={styles.card}>
          <Text style={styles.campTitle}>{params.title}</Text>
>>>>>>> Stashed changes

          <View style={styles.info}>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Reservation Date: </Text>
<<<<<<< Updated upstream
              {reservation.reservationDate || "N/A"}
            </Text>
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
              {reservation.checkInTime || "N/A"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Check-Out: </Text>
              {reservation.checkOutTime || "N/A"}
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

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
=======
              {params.reservationDate}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Customer: </Text>
              {params.customer}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Contact: </Text>
              {params.contact}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Stay Duration: </Text>
              {params.stayDuration}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Check-In: </Text>
              {params.checkInTime}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Check-Out: </Text>
              {params.checkOutTime}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Guest(s): </Text>
              {params.guest}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>Payment: </Text>
              {params.payment}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => router.push("/dashboard/reservation")}
          >
>>>>>>> Stashed changes
            <Text style={styles.doneText}>Done</Text>
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
    position: "absolute",
<<<<<<< Updated upstream
    top: 70,
=======
    top: 50,
>>>>>>> Stashed changes
    left: 25,
    zIndex: 2,
    backgroundColor: "#00000060",
    padding: 6,
    borderRadius: 50,
  },
  header: {
<<<<<<< Updated upstream
    marginTop: 50,
=======
>>>>>>> Stashed changes
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#000",
  },
<<<<<<< Updated upstream
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
=======
  card: { backgroundColor: "#ffffffcc", borderRadius: 20, padding: 20 },
  campTitle: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  info: { marginTop: 10 },
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  editIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 20,
    zIndex: 2,
  },
=======
>>>>>>> Stashed changes
});
