import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

type TransactionItem = {
  id: string;
  title: string;
  time: string;
};

export default function Transact() {
  const pastData: TransactionItem[] = [
    { id: "1", title: "Trash A is Full", time: "09-30-25-9:46AM" },
    { id: "2", title: "Trash B is Full", time: "09-30-25-1:24PM" },
    { id: "3", title: "Trash C is Full", time: "09-30-25-4:12PM" },
    { id: "4", title: "Trash A is Full", time: "09-30-25-9:51AM" },
  ];

  const cancelledData: TransactionItem[] = [
    { id: "5", title: "Trash D - Cancelled", time: "09-29-25-2:30PM" },
    { id: "6", title: "Trash E - Cancelled", time: "09-29-25-4:45PM" },
  ];

  const [activeTab, setActiveTab] = useState<"Past" | "Cancelled">("Past");

  const renderItem = ({ item }: { item: TransactionItem }) => (
    <View style={styles.card}>
      <Image
        source={require("../../assets/images/Cowboys.png")}
        style={styles.icon}
      />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Past" && styles.activeTab]}
          onPress={() => setActiveTab("Past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Past" && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Cancelled" && styles.activeTab]}
          onPress={() => setActiveTab("Cancelled")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Cancelled" && styles.activeTabText,
            ]}
          >
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === "Past" ? pastData : cancelledData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "400",
    color: "#000",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#555",
  },
  activeTabText: {
    fontWeight: "600",
    color: "#000",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 24,
    padding: 18,
    marginBottom: 12,
  },
  icon: {
    width: 42,
    height: 42,
    marginRight: 18,
    resizeMode: "contain",
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
});
