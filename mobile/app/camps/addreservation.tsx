import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function AddReservation() {
  const router = useRouter();
  const params = useLocalSearchParams() as any;
  const isEditMode = !!params.id;

  const [checkIn, setCheckIn] = useState(params.checkInTime ? new Date(params.checkInTime) : new Date());
  const [checkOut, setCheckOut] = useState(params.checkOutTime ? new Date(params.checkOutTime) : new Date());

  const [showPicker, setShowPicker] = useState<"checkInDate" | "checkInTime" | "checkOutDate" | "checkOutTime" | null>(null);

  const [customer, setCustomer] = useState(params.customer || "");
  const [contact, setContact] = useState(params.contact || "");
  const [stayDuration, setStayDuration] = useState(params.stayDuration || "");
  const [guest, setGuest] = useState(params.guest || "");

  const [payment, setPayment] = useState(params.payment || "Select Payment");
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const paymentOptions = ["Gcash", "Cash"];

  const formatDateTime = (date: Date) => {
    const d = date.toLocaleDateString();
    const t = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    return `${d} ${t}`;
  };

  const handleReservationPress = () => {
    setShowPicker("checkInDate");
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (!selectedDate) {
      setShowPicker(null);
      return;
    }

    switch (showPicker) {
      case "checkInDate":
        setCheckIn(selectedDate);
        setShowPicker("checkInTime");
        break;
      case "checkInTime":
        setCheckIn(prev => new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()
        ));
        setShowPicker("checkOutDate");
        break;
      case "checkOutDate":
        setCheckOut(selectedDate);
        setShowPicker("checkOutTime");
        break;
      case "checkOutTime":
        setCheckOut(prev => new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()
        ));
        setShowPicker(null);
        break;
    }
  };

  const handleSubmit = () => {
    const reservationData = {
      id: params.id || Date.now().toString(),
      title: params.title,
      image: params.image,
      customer,
      contact,
      stayDuration,
      guest,
      checkInTime: checkIn.toISOString(),
      checkOutTime: checkOut.toISOString(),
      payment,
    };

    router.push({
      pathname: "/camps/reservationdetails",
      params: reservationData,
    });
  };

  return (
    <ImageBackground source={require("../../assets/images/dashboardbg.png")} style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={params.image} style={styles.headerImage} />
        <Text style={styles.title}>{isEditMode ? "Edit Reservation" : params.title}</Text>

        <View style={styles.form}>
          {/* Reservation Period */}
          <Text style={styles.label}>Check-In & Check-Out Period</Text>
          <TouchableOpacity style={styles.dateInput} onPress={handleReservationPress}>
            <Text style={styles.dateText}>
              {formatDateTime(checkIn)} – {formatDateTime(checkOut)}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#000" />
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={
                showPicker === "checkInDate" || showPicker === "checkInTime" ? checkIn : checkOut
              }
              mode={showPicker.endsWith("Date") ? "date" : "time"}
              display="default"
              onChange={onChange}
            />
          )}

          {/* Customer */}
          <Text style={styles.label}>Customer:</Text>
          <TextInput style={styles.input} value={customer} onChangeText={setCustomer} />

          {/* Contact */}
          <Text style={styles.label}>Contact:</Text>
          <TextInput style={styles.input} value={contact} onChangeText={setContact} keyboardType="phone-pad" />

          {/* Stay Duration */}
          <Text style={styles.label}>Stay Duration:</Text>
          <TextInput style={styles.input} value={stayDuration} onChangeText={setStayDuration} />

          {/* Guest */}
          <Text style={styles.label}>Guest(s):</Text>
          <TextInput
            style={styles.input}
            value={guest}
            onChangeText={setGuest}
            keyboardType="numeric"
          />

          {/* Payment Dropdown */}
          <Text style={styles.label}>Payment Type:</Text>
          <View style={styles.paymentDropdownContainer}>
            <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}>
              <Text style={styles.dropdownText}>{payment}</Text>
              <Ionicons name={showPaymentDropdown ? "chevron-up" : "chevron-down"} size={18} color="#000" />
            </TouchableOpacity>
            {showPaymentDropdown && (
              <View style={styles.dropdownOverlay}>
                <ScrollView nestedScrollEnabled>
                  {paymentOptions.map((option) => (
                    <TouchableOpacity key={option} style={styles.dropdownItem} onPress={() => { setPayment(option); setShowPaymentDropdown(false); }}>
                      <Text style={styles.dropdownItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.addButtonText}>{isEditMode ? "Save Changes" : "Add Reservation"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  backButton: {
    position: "absolute",
    top: 50,
    left: 25,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 6,
    borderRadius: 50,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffffcc",
    borderRadius: 20,
    margin: 1,
    paddingBottom: 40,
  },
  headerImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  form: { padding: 20 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 4, color: "#000" },
  input: {
    backgroundColor: "#d9c1aa",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d9c1aa",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  dateText: { color: "#000" },
  paymentDropdownContainer: { position: "relative" },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d9c1aa",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  dropdownText: { color: "#000" },
  dropdownOverlay: {
    position: "absolute",
    top: 45,
    left: 0,
    width: "100%",
    backgroundColor: "#f3e2cf",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#caa47f",
    maxHeight: 120,
    zIndex: 10,
    elevation: 10,
  },
  dropdownItem: { paddingVertical: 8, paddingHorizontal: 10 },
  dropdownItemText: { color: "#000" },
  addButton: {
    backgroundColor: "#f28c28",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 30,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
