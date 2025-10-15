import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
// --- MAIN COMPONENT ---
export default function Account() {
  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>My Account</Text>
        <View style={styles.headerLine} />
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
            <Text style={styles.menuText}>Profile Details</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem2}>
<<<<<<< Updated upstream
          <Link href="/transact/transacts">
=======
          <Link href="/transact/transact">
>>>>>>> Stashed changes
            <Text style={styles.menuText}>Transaction History</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem3}>
          <Link href="/suggest/suggests">
            <Text style={styles.menuText}>Suggestions</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem4}>
          <Link href="/termpo/termpol">
            <Text style={styles.menuText}>Terms & Policy</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn}>
        <Link href="/login">
          <Text style={styles.logoutText}>LOGOUT</Text>
        </Link>
        </TouchableOpacity>
      </View>

      
    </ImageBackground>
  );
}
// --- TAB BAR COMPONENT ---
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
    fontSize: 32,
    fontWeight: "900",
    color: "#000",
  },
  headerLine: {
  width: "100%",
  height: 1,
  backgroundColor: "#000",
  marginTop: 15,
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
    backgroundColor: "#8b4513cc",
    borderBlockColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 40,
    padding: 10,
  },

  menuItem1: {
    marginTop: 2,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItem2: {
    marginTop: 2,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItem3: {
    marginTop: 2,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuItem4: {
    marginTop: 2,
    padding: 20,
  },
  menuText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "500",
    color: "#ffecdbff",
  },
  logoutBtn: {
    marginTop: 50,
    marginLeft  : 60,
    marginRight : 60,
    backgroundColor: "#ED8E45",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
  },
  logoutText: {
    color: "#000000ff",
    textShadowColor: "#FDD384",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
