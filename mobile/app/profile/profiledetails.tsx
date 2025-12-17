import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../app/context/UserContext";

export default function ProfileDetails() {
  const router = useRouter();
  const { profileImage, userData, updateUserData } = useUser();

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [contact, setContact] = useState(userData.contact);
  const [address, setAddress] = useState(userData.address);

  useEffect(() => {
    setName(userData.name);
    setEmail(userData.email);
    setContact(userData.contact);
    setAddress(userData.address);
  }, [userData]);

  const handleSave = () => {
    updateUserData({ name, email, contact, address });
    Alert.alert("Success", "Profile details updated successfully!", [
      { text: "OK", onPress: () => router.back() } 
    ]);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {/* ✅ KEYBOARD FIX: Added offset */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                <Ionicons name="arrow-back" size={28} color="#000" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Edit Profile</Text>
              <View style={{ width: 28 }} /> 
            </View>

            {/* PROFILE IMAGE */}
            <View style={styles.profileSection}>
              <View style={styles.imageWrapper}>
                <Image source={profileImage} style={styles.profileIcon} />
                <Link href="/profile/profilepic" asChild>
                  <TouchableOpacity style={styles.cameraIcon} activeOpacity={0.8}>
                    <Ionicons name="camera" size={20} color="#fff" />
                  </TouchableOpacity>
                </Link>
              </View>
              <Text style={styles.changePhotoText}>Change Profile Photo</Text>
            </View>

            {/* FORM */}
            <View style={styles.formContainer}>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={name} 
                    onChangeText={setName} 
                    placeholder="Enter Name" 
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={email} 
                    onChangeText={setEmail} 
                    placeholder="Enter Email" 
                    placeholderTextColor="#999" 
                    keyboardType="email-address"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contact Number</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={contact} 
                    onChangeText={setContact} 
                    placeholder="Enter Contact" 
                    placeholderTextColor="#999" 
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="location-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={address} 
                    onChangeText={setAddress} 
                    placeholder="Enter Address" 
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>

            {/* ✅ EXTRA PADDING: Ensures the bottom is reachable */}
            <View style={{ height: 10 }} /> 

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  safeArea: { flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  
  // Added generous padding to the bottom of the scroll container
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20, marginBottom: 20 },
  backBtn: { padding: 5 },
  headerText: { fontSize: 24, fontWeight: "800", color: "#000" },

  profileSection: { alignItems: "center", marginBottom: 30 },
  imageWrapper: { position: "relative" },
  profileIcon: { width: 110, height: 110, borderRadius: 55, backgroundColor: "#fff", borderWidth: 3, borderColor: "#8B5E3C" },
  cameraIcon: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#E38B29", borderRadius: 20, padding: 8, borderWidth: 2, borderColor: "#fff", elevation: 4 },
  changePhotoText: { marginTop: 10, color: "#444", fontSize: 14, fontWeight: "500" },

  formContainer: { backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: 20, padding: 20, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "700", color: "#333", marginBottom: 6, marginLeft: 4 },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#f0f0f0", borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: "#ddd" },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 14, fontSize: 16, color: "#000" },

  saveBtn: { backgroundColor: "#E38B29", paddingVertical: 16, borderRadius: 12, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 18, letterSpacing: 0.5 },
});