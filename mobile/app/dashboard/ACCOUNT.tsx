import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// ✅ Import Context
import { useUser } from "../../app/context/UserContext"; 

export default function Account() {
  const router = useRouter();
  // ✅ Get profileImage AND userData (Name/Email)
  const { profileImage, userData } = useUser(); 

  const menuItems = [
    { label: "Profile Details", icon: "person-outline", path: "/profile/profiledetails" },
    { label: "Transaction History", icon: "receipt-outline", path: "/transact/transacts" },
    { label: "Suggestions", icon: "bulb-outline", path: "/suggest/suggests" },
    { label: "Terms & Policy", icon: "document-text-outline", path: "/termpo/termpol" },
  ];

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          
          <View style={styles.header}>
            <Text style={styles.headerText}>My Account</Text>
            <View style={styles.headerLine} />
          </View>

          {/* PROFILE SECTION */}
          <View style={styles.profileSection}>
            <Link href="/profile/profiledetails" asChild>
              <TouchableOpacity activeOpacity={0.8} style={styles.imageWrapper}>
                <Image source={profileImage} style={styles.profileIcon} />
                <View style={styles.editBadge}>
                  <Ionicons name="pencil" size={14} color="#fff" />
                </View>
              </TouchableOpacity>
            </Link>
            
            {/* ✅ UPDATED: Dynamic Name and Email */}
            <Text style={styles.profileName}>{userData?.name || "My Name"}</Text>
            <Text style={styles.profileEmail}>{userData?.email || "user@example.com"}</Text>
          </View>

          {/* MAIN MENU */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <Link href={item.path as any} asChild>
                  <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                    <View style={styles.menuItemLeft}>
                      <Ionicons name={item.icon as any} size={24} color="#FFFFFF" style={styles.menuIcon} />
                      <Text style={styles.menuText}>{item.label}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.6)" />
                  </TouchableOpacity>
                </Link>
                {index < menuItems.length - 1 && <View style={styles.separator} />}
              </React.Fragment>
            ))}

             <View style={styles.separator} />

            <Link href="/login" asChild>
              <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
                <Ionicons name="log-out-outline" size={22} color="#000" style={{ marginRight: 8 }} />
                <Text style={styles.logoutText}>LOGOUT</Text>
              </TouchableOpacity>
            </Link>

          </View>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  safeArea: { flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  container: { alignItems: "center", paddingBottom: 40 },
  header: { width: "100%", paddingTop: 30, alignItems: "center", marginBottom: 20 },
  headerText: { fontSize: 32, fontWeight: "800", color: "#2c2c2c" },
  headerLine: { width: "90%", height: 1, backgroundColor: "#000", marginTop: 15, opacity: 0.6 },
  profileSection: { alignItems: "center", marginBottom: 25 },
  imageWrapper: { position: 'relative', marginBottom: 10, padding: 3, backgroundColor: '#fff', borderRadius: 60, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  profileIcon: { width: 100, height: 100, borderRadius: 50 },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#E38B29', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  profileName: { fontSize: 22, fontWeight: "700", color: "#000" },
  profileEmail: { fontSize: 15, color: "#444", fontWeight: "500", marginTop: 2 },
  menuContainer: { width: "88%", backgroundColor: "#8B5E3C", borderRadius: 24, paddingVertical: 20, paddingHorizontal: 20, borderWidth: 1, borderColor: "#5A3A22", marginBottom: 20, elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { marginRight: 15, opacity: 0.9 },
  menuText: { fontSize: 17, color: "#FFFFFF", fontWeight: "500", letterSpacing: 0.5 },
  separator: { height: 1, backgroundColor: "#FFFFFF", opacity: 0.3, marginVertical: 4 },
  logoutBtn: { marginTop: 20, flexDirection: 'row', backgroundColor: "#E38B29", paddingVertical: 14, alignItems: "center", justifyContent: "center", borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  logoutText: { color: "#000", fontWeight: "800", fontSize: 16, letterSpacing: 1 },
});