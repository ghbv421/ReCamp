import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

type ReservationItem = {
  id: string;
  title: string;
  time: string;
};

export default function Reservation() {
  const data: ReservationItem[] = [
    { id: "1", title: "Cowboy's Camp", time: "09-30-25-9:46AM" },
    { id: "2", title: "Camp Agos River", time: "09-30-25-1:24PM" },
    { id: "3", title: "Camp Hapitanan", time: "09-30-25-4:12PM" },
    { id: "4", title: "Camp Zion", time: "09-30-25-9:51AM" },
    { id: "5", title: "Cowboy's Camp", time: "09-30-25-9:46AM" },
    { id: "6", title: "Camp Agos River", time: "09-30-25-1:24PM" },
    { id: "7", title: "Camp Hapitanan", time: "09-30-25-4:12PM" },
    { id: "8", title: "Camp Zion", time: "09-30-25-9:51AM" },
  ];

  const renderItem = ({ item }: { item: ReservationItem }) => (
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
        <Text style={styles.title}>Reservation</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>Upcoming</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
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
    fontSize: 28,
    fontWeight: "600",
    color: "#000",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  activeTabText: {
    fontSize: 18,
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
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
  },
  icon: {
    width: 70,  
    height: 70,  
    marginRight: 18,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: "600",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 3,
  },
});
