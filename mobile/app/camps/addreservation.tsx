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
  TouchableWithoutFeedback,
<<<<<<< Updated upstream
=======
  Platform,
>>>>>>> Stashed changes
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function AddReservation() {
  const router = useRouter();
<<<<<<< Updated upstream
  const params = useLocalSearchParams() as any;

  const isEditMode = !!params.id;

=======
  const params = useLocalSearchParams() as {
    id?: string;
    title?: string;
    image?: any;
    reservationDate?: string;
    checkInTime?: string;
    checkOutTime?: string;
    customer?: string;
    contact?: string;
    stayDuration?: string;
    guest?: string;
    payment?: string;
  };

  // Form States
>>>>>>> Stashed changes
  const [reservationDate, setReservationDate] = useState(
    params.reservationDate ? new Date(params.reservationDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [checkInTime, setCheckInTime] = useState(
    params.checkInTime ? new Date(`1970-01-01T${params.checkInTime}`) : new Date()
  );
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);

  const [checkOutTime, setCheckOutTime] = useState(
    params.checkOutTime ? new Date(`1970-01-01T${params.checkOutTime}`) : new Date()
  );
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const [customer, setCustomer] = useState(params.customer || "");
  const [contact, setContact] = useState(params.contact || "");
  const [stayDuration, setStayDuration] = useState(params.stayDuration || "");
  const [guest, setGuest] = useState(params.guest || "");
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const [payment, setPayment] = useState(params.payment || "Gcash");
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const guestOptions = [...Array(50)].map((_, i) => `${i + 1}`);
  const paymentOptions = ["Gcash", "Cash", "Credit Card"];

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

  const handleSubmit = () => {
<<<<<<< Updated upstream
    const reservationData = {
      id: params.id || Date.now().toString(),
      title: params.title,
      image: params.image,
      reservationDate: reservationDate.toDateString(),
      customer,
      contact,
      stayDuration,
      guest,
      checkInTime: formatTime(checkInTime),
      checkOutTime: formatTime(checkOutTime),
      payment,
    };

    router.push({
      pathname: "/camps/reservationdetails",
      params: reservationData,
=======
    router.push({
      pathname: "/camps/reservationdetails",
      params: {
        id: params.id || Date.now().toString(),
        title: params.title,
        image: params.image,
        reservationDate: reservationDate.toDateString(),
        customer,
        contact,
        stayDuration,
        guest,
        checkInTime: formatTime(checkInTime),
        checkOutTime: formatTime(checkOutTime),
        payment,
      },
>>>>>>> Stashed changes
    });
  };

  return (
<<<<<<< Updated upstream
    <TouchableWithoutFeedback onPress={() => { setShowGuestDropdown(false); setShowPaymentDropdown(false); }}>
=======
    <TouchableWithoutFeedback
      onPress={() => {
        setShowGuestDropdown(false);
        setShowPaymentDropdown(false);
      }}
    >
>>>>>>> Stashed changes
      <ImageBackground
        source={require("../../assets/images/dashboardbg.png")}
        style={styles.background}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.container}>
          <Image source={params.image} style={styles.headerImage} />
<<<<<<< Updated upstream
          <Text style={styles.title}>{isEditMode ? "Edit Reservation" : params.title}</Text>
=======
          <Text style={styles.title}>{params.title}</Text>
>>>>>>> Stashed changes

          <View style={styles.form}>
            {/* Reservation Date */}
            <Text style={styles.label}>Reservation Date:</Text>
<<<<<<< Updated upstream
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
=======
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
>>>>>>> Stashed changes
              <Text style={styles.dateText}>{reservationDate.toDateString()}</Text>
              <Ionicons name="calendar-outline" size={20} color="#000" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={reservationDate}
                mode="date"
                display="default"
<<<<<<< Updated upstream
                onChange={(e, d) => { setShowDatePicker(false); if (d) setReservationDate(d); }}
=======
                onChange={(e, d) => {
                  setShowDatePicker(false);
                  if (d) setReservationDate(d);
                }}
>>>>>>> Stashed changes
              />
            )}

            {/* Customer */}
            <Text style={styles.label}>Customer:</Text>
<<<<<<< Updated upstream
            <TextInput style={styles.input} value={customer} onChangeText={setCustomer} />

            {/* Contact */}
            <Text style={styles.label}>Contact:</Text>
            <TextInput style={styles.input} value={contact} onChangeText={setContact} keyboardType="phone-pad" />

            {/* Stay Duration */}
            <Text style={styles.label}>Stay Duration:</Text>
            <TextInput style={styles.input} value={stayDuration} onChangeText={setStayDuration} />

            {/* Guest Dropdown */}
=======
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={customer}
              onChangeText={setCustomer}
            />

            {/* Contact */}
            <Text style={styles.label}>Contact:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact number"
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
            />

            {/* Stay Duration */}
            <Text style={styles.label}>Stay Duration:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 2 days, 1 night"
              value={stayDuration}
              onChangeText={setStayDuration}
            />

            {/* Guest */}
>>>>>>> Stashed changes
            <Text style={styles.label}>Guest(s):</Text>
            <View style={styles.guestRow}>
              <TextInput
                style={[styles.input, styles.guestInput]}
<<<<<<< Updated upstream
                value={guest}
                onChangeText={(text) => { setGuest(text); setShowGuestDropdown(false); }}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.dropdownIconButton} onPress={() => setShowGuestDropdown(!showGuestDropdown)}>
                <Ionicons name={showGuestDropdown ? "chevron-up" : "chevron-down"} size={18} color="#000" />
              </TouchableOpacity>
=======
                placeholder="No."
                value={guest}
                onChangeText={(text) => {
                  setGuest(text);
                  setShowGuestDropdown(false);
                }}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.dropdownIconButton}
                onPress={() => setShowGuestDropdown(!showGuestDropdown)}
              >
                <Ionicons
                  name={showGuestDropdown ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#000"
                />
              </TouchableOpacity>

>>>>>>> Stashed changes
              {showGuestDropdown && (
                <View style={styles.dropdownOverlay}>
                  <ScrollView nestedScrollEnabled>
                    {guestOptions.map((option) => (
<<<<<<< Updated upstream
                      <TouchableOpacity key={option} style={styles.dropdownItem} onPress={() => { setGuest(option); setShowGuestDropdown(false); }}>
=======
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setGuest(option);
                          setShowGuestDropdown(false);
                        }}
                      >
>>>>>>> Stashed changes
                        <Text style={styles.dropdownItemText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Check-In */}
            <Text style={styles.label}>Check-In Time:</Text>
<<<<<<< Updated upstream
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowCheckInPicker(true)}>
=======
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowCheckInPicker(true)}
            >
>>>>>>> Stashed changes
              <Text style={styles.dateText}>{formatTime(checkInTime)}</Text>
              <Ionicons name="time-outline" size={20} color="#000" />
            </TouchableOpacity>
            {showCheckInPicker && (
              <DateTimePicker
                value={checkInTime}
                mode="time"
                display="spinner"
<<<<<<< Updated upstream
                onChange={(e, d) => { setShowCheckInPicker(false); if (d) setCheckInTime(d); }}
=======
                is24Hour={false}
                themeVariant="light"
                textColor="#000"
                onChange={(e, d) => {
                  setShowCheckInPicker(false);
                  if (d) setCheckInTime(d);
                }}
>>>>>>> Stashed changes
              />
            )}

            {/* Check-Out */}
            <Text style={styles.label}>Check-Out Time:</Text>
<<<<<<< Updated upstream
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowCheckOutPicker(true)}>
=======
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowCheckOutPicker(true)}
            >
>>>>>>> Stashed changes
              <Text style={styles.dateText}>{formatTime(checkOutTime)}</Text>
              <Ionicons name="time-outline" size={20} color="#000" />
            </TouchableOpacity>
            {showCheckOutPicker && (
              <DateTimePicker
                value={checkOutTime}
                mode="time"
                display="spinner"
<<<<<<< Updated upstream
                onChange={(e, d) => { setShowCheckOutPicker(false); if (d) setCheckOutTime(d); }}
              />
            )}

            {/* Payment Dropdown */}
            <Text style={styles.label}>Payment Type:</Text>
            <View style={styles.paymentDropdownContainer}>
              <TouchableOpacity style={styles.dropdownButton} onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}>
                <Text style={styles.dropdownText}>{payment}</Text>
                <Ionicons name={showPaymentDropdown ? "chevron-up" : "chevron-down"} size={18} color="#000" />
              </TouchableOpacity>
=======
                is24Hour={false}
                themeVariant="light"
                textColor="#000"
                onChange={(e, d) => {
                  setShowCheckOutPicker(false);
                  if (d) setCheckOutTime(d);
                }}
              />
            )}

            {/* Payment */}
            <Text style={styles.label}>Payment Type:</Text>
            <View style={styles.paymentDropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}
              >
                <Text style={styles.dropdownText}>{payment}</Text>
                <Ionicons
                  name={showPaymentDropdown ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#000"
                />
              </TouchableOpacity>

>>>>>>> Stashed changes
              {showPaymentDropdown && (
                <View style={styles.dropdownOverlay}>
                  <ScrollView nestedScrollEnabled>
                    {paymentOptions.map((option) => (
<<<<<<< Updated upstream
                      <TouchableOpacity key={option} style={styles.dropdownItem} onPress={() => { setPayment(option); setShowPaymentDropdown(false); }}>
=======
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setPayment(option);
                          setShowPaymentDropdown(false);
                        }}
                      >
>>>>>>> Stashed changes
                        <Text style={styles.dropdownItemText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
<<<<<<< Updated upstream
              <Text style={styles.addButtonText}>{isEditMode ? "Save Changes" : "Add Reservation"}</Text>
=======
              <Text style={styles.addButtonText}>Add Reservation</Text>
>>>>>>> Stashed changes
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

<<<<<<< Updated upstream

// (Styles omitted for brevity; you can reuse your previous styles)


=======
// --- STYLES ---
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    margin: 1,
    paddingBottom: 40,
=======
    margin: 15,
    paddingBottom: 30,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
  guestRow: { flexDirection: "row", alignItems: "center", position: "relative" },
  guestInput: { flex: 1, marginRight: 4 },
  dropdownIconButton: {
    marginBottom: 10,
    backgroundColor: "#d9c1aa",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 7,
    height: 36,
    justifyContent: "center",
  },
  dropdownOverlay: {
    position: "absolute",
    top: -45,
    left: 165,
    width: 120,
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
  paymentDropdownContainer: { position: "relative" },
  addButton: {
    backgroundColor: "#f28c28",
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 30,
    alignItems: "center",
  },
=======
  input: { backgroundColor: "#d9c1aa", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10 },
  dateInput: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#d9c1aa", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10 },
  dateText: { color: "#000" },
  guestRow: { flexDirection: "row", alignItems: "center", position: "relative" },
  guestInput: { flex: 1, marginRight: 4 },
  dropdownIconButton: { marginBottom: 10, backgroundColor: "#d9c1aa", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 8, height: 38, justifyContent: "center" },
  dropdownOverlay: { position: "absolute", top: 45, left: 0, width: 120, backgroundColor: "#f3e2cf", borderRadius: 6, borderWidth: 1, borderColor: "#caa47f", maxHeight: 120, zIndex: 10, elevation: 10 },
  dropdownItem: { paddingVertical: 8, paddingHorizontal: 10 },
  dropdownItemText: { color: "#000" },
  dropdownButton: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#d9c1aa", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 10 },
  dropdownText: { color: "#000" },
  paymentDropdownContainer: { position: "relative" },
  addButton: { backgroundColor: "#f28c28", paddingVertical: 14, borderRadius: 30, marginTop: 10, alignItems: "center" },
>>>>>>> Stashed changes
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
