import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Account() {
  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>My Account</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/images/Profile-icon.png")}
          style={styles.profileIcon}
        />
        <Text style={styles.profileName}>My Name</Text>
      </View>

      <View style={styles.menuBox}>
        <TouchableOpacity style={styles.menuItem1}>
          <Link href="/profile/profiledetails"> 
          <Text style={styles.menuText}> Profile Details</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem2}>
          <Link href="/transact/transact"> 
          <Text style={styles.menuText}>   Transaction History</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem3}>
          <Text style={styles.menuText}>   Suggestions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem4}>     
          <Text style={styles.menuText}>  Terms & Policy</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <Link href="/login">
        <Text style={styles.logoutText}>Logout</Text>
        </Link>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  header: {
    width: "100%",
    paddingTop: 50,
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  line: {
    marginTop: 8,
    width: "100%",
    height: 1,
    backgroundColor: "#000",
  },
  profileSection: {
    marginTop: 20,
    alignItems: "center",
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  menuBox: {
    width: "90%",
    backgroundColor: "rgba(139,69,19,0.8)",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  
  menuItem: {
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItem1: {
    marginBottom: 2,
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItem2: {
    marginTop: 15,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItem3: {
    marginTop: 15,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItem4: {
    marginTop: 15,
    padding: 5,
  },
  menuText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  logoutBtn: {
    marginTop: 40,
    backgroundColor: "#FF8C42",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 8,
  },
  logoutText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
