import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router"; // ✅ import useRouter
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileDetails() {
  const router = useRouter(); // ✅ create router instance

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <Image
            source={require("../../assets/images/Profile-icon.png")}
            style={styles.profileIcon}
          />

          {/* Make the camera icon clickable and navigate */}
          <Link href="/profile/profilepic" asChild>
            <TouchableOpacity style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#555"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          placeholderTextColor="#555"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#555"
        />

        <TouchableOpacity style={styles.saveBtn}>
          <Link href={"/dashboard/account"}>
            <Text style={styles.saveText}>Save Changes</Text>
          </Link>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    marginTop: 10,
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileSection: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  input: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    fontSize: 16,
    elevation: 2,
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: "#FF8C42",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
