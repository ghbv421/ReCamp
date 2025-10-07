import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";

type TransactionDetails = {
  transactionId: string;
  reservationDate: string;
  customer: string;
  contact: string;
  campsite: string;
  stayType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  addons: string;
  paymentMethod: string;
  amountPaid: string;
  status: string;
};

type TransactionItem = {
  id: string;
  title: string;
  time: string;
  iconSize?: { width: number; height: number };
  details?: TransactionDetails;
  cancelledDetails?: CancelledDetails; // ✨ added
};

type CancelledDetails = {
  campsite: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  dateIssued: string;
  dateCancelled: string;
  status: string;
  image: any;
};

export default function Transact() {
  const pastData: TransactionItem[] = [
    {
      id: "1",
      title: "Camp Hapitanan — Checked Out",
      time: "09-30-25 • 9:46 AM",
      iconSize: { width: 45, height: 75 },
      details: {
        transactionId: "TRX-20251004-001",
        reservationDate: "October 4, 2025",
        customer: "Juan Dela Cruz",
        contact: "+63 912 345 6789",
        campsite: "Camp H – Site A",
        stayType: "Overnight (2D1N)",
        checkIn: "Oct 10, 2025 – 04:00pm",
        checkOut: "Oct 11, 2025 – 01:00pm",
        guests: 5,
        addons: "Tent rental (2), Firewood, Guided hike",
        paymentMethod: "GCash",
        amountPaid: "₱3,500.00",
        status: "✅ Confirmed",
      },
    },
    {
      id: "2",
      title: "Camp Agos River — Checked Out",
      time: "09-30-25 • 1:24 PM",
      iconSize: { width: 55, height: 55 },
      details: {
        transactionId: "TRX-20251004-002",
        reservationDate: "October 4, 2025",
        customer: "Maria Santos",
        contact: "+63 917 234 5678",
        campsite: "Camp Hapitanan – Site B",
        stayType: "Day Tour",
        checkIn: "Oct 12, 2025 – 08:00am",
        checkOut: "Oct 12, 2025 – 03:00pm",
        guests: 3,
        addons: "Picnic table, Kayak rental",
        paymentMethod: "Cash",
        amountPaid: "₱2,000.00",
        status: "✅ Confirmed",
      },
    },
    {
      id: "3",
      title: "Camp Zion — Checked Out",
      time: "09-30-25 • 4:12 PM",
      iconSize: { width: 60, height: 60 },
      details: {
        transactionId: "TRX-20251004-003",
        reservationDate: "October 4, 2025",
        customer: "Carlos Dela Vega",
        contact: "+63 915 678 1234",
        campsite: "Camp Zion – Site C",
        stayType: "Overnight (3D2N)",
        checkIn: "Oct 15, 2025 – 04:00pm",
        checkOut: "Oct 17, 2025 – 09:00am",
        guests: 6,
        addons: "Tent rental (3), Bonfire, Tour guide",
        paymentMethod: "Credit Card",
        amountPaid: "₱7,500.00",
        status: "✅ Confirmed",
      },
    },
    {
      id: "4",
      title: "Vista del Paraiso — Checked Out",
      time: "09-30-25 • 9:51 AM",
      iconSize: { width: 50, height: 50 },
      details: {
        transactionId: "TRX-20251004-004",
        reservationDate: "October 4, 2025",
        customer: "Ana Cruz",
        contact: "+63 916 789 4567",
        campsite: "Vista del Paraiso – Site D",
        stayType: "Overnight (2D1N)",
        checkIn: "Oct 18, 2025 – 05:00pm",
        checkOut: "Oct 19, 2025 – 07:00am",
        guests: 2,
        addons: "Table & Chairs, Lantern rental",
        paymentMethod: "GCash",
        amountPaid: "₱2,800.00",
        status: "✅ Confirmed",
      },
    },
  ];

  const cancelledData: TransactionItem[] = [
    {
      id: "5",
      title: "Little Baguio — Booking Cancelled",
      time: "09-29-25 • 2:30 PM",
      iconSize: { width: 40, height: 40 },
      cancelledDetails: {
        campsite: "Little Baguio",
        name: "Libby Maseguiao",
        email: "libgwaps@gmail.com",
        contactNumber: "123456789",
        address: "haws n crush",
        dateIssued: "09-30-25 • 9:46 AM",
        dateCancelled: "09-30-25 • 9:46 AM",
        status: "Cancelled",
        image: require("../../assets/images/Lilbaguio.png"), // replace with your actual image
      },
    },
    {
      id: "6",
      title: "Camp Zion — Booking Cancelled",
      time: "09-29-25 • 4:45 PM",
      iconSize: { width: 48, height: 48 },
      cancelledDetails: {
        campsite: "Camp Zion",
        name: "",
        email: "",
        contactNumber: "",
        address: "",
        dateIssued: "09-29-25 • 4:00 PM",
        dateCancelled: "09-29-25 • 4:45 PM",
        status: "Cancelled",
        image: require("../../assets/images/Zion.jpg"),
      },
    },
  ];

  const [activeTab, setActiveTab] = useState<"Past" | "Cancelled">("Past");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (item: TransactionItem) => {
    setSelectedTransaction(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: TransactionItem }) => {
    const isCancelled = item.title.includes("Cancelled");

    return (
      <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
        {/* Icon */}
        <Image
          source={require("../../assets/images/Cowboys.png")}
          style={[styles.icon, item.iconSize]}
        />

        {/* Title & Time */}
        <View style={styles.cardTextContainer}>
          <Text style={[styles.cardTitle, isCancelled && styles.cancelledText]}>
            {item.title}
          </Text>
          <Text
            style={[styles.cardSubtitle, isCancelled && styles.cancelledText]}
          >
            {item.time}
          </Text>
        </View>

        {/* Cancelled Icon */}
        {isCancelled && <Text style={styles.cancelledIconText}>❌</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      {/* Tabs */}
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

      {/* List */}
      <View style={{ flex: 1, zIndex: 1 }}>
        <FlatList
          data={activeTab === "Past" ? pastData : cancelledData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              {selectedTransaction?.details ? (
                <>
                  <Text style={styles.modalTitle}>Transaction Details</Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Transaction ID: </Text>
                    {selectedTransaction.details.transactionId}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Reservation Date: </Text>
                    {selectedTransaction.details.reservationDate}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Customer: </Text>
                    {selectedTransaction.details.customer}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Contact: </Text>
                    {selectedTransaction.details.contact}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Camp Site: </Text>
                    {selectedTransaction.details.campsite}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Stay Type: </Text>
                    {selectedTransaction.details.stayType}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Check-in: </Text>
                    {selectedTransaction.details.checkIn}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Check-out: </Text>
                    {selectedTransaction.details.checkOut}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Guests: </Text>
                    {selectedTransaction.details.guests}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Add-ons: </Text>
                    {selectedTransaction.details.addons}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Payment Method: </Text>
                    {selectedTransaction.details.paymentMethod}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Amount Paid: </Text>
                    {selectedTransaction.details.amountPaid}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Status: </Text>
                    {selectedTransaction.details.status}
                  </Text>
                </>


              ) : selectedTransaction?.cancelledDetails ? (
                <>
                  <Image
                    source={selectedTransaction.cancelledDetails.image}
                    style={styles.cancelledImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.cancelledCampTitle}>
                    {selectedTransaction.cancelledDetails.campsite}
                  </Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Name: </Text>
                    {selectedTransaction.cancelledDetails.name}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Email Address: </Text>
                    {selectedTransaction.cancelledDetails.email}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Contact Number: </Text>
                    {selectedTransaction.cancelledDetails.contactNumber}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Address: </Text>
                    {selectedTransaction.cancelledDetails.address}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Date Issued: </Text>
                    {selectedTransaction.cancelledDetails.dateIssued}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Date Cancelled: </Text>
                    {selectedTransaction.cancelledDetails.dateCancelled}
                  </Text>
                  <Text style={styles.detailText}>
                    <Text style={styles.detailLabel}>Status: </Text>
                    {selectedTransaction.cancelledDetails.status}
                  </Text>
                </>
              ) : null}
            </ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    marginRight: 18,
    resizeMode: "contain",
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 3,
  },
  cancelledText: {
    color: "#888",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cancelledIconText: {
    fontSize: 16,
    marginLeft: 6,
    color: "red",
  },
  cancelledImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 25,
  },
  cancelledCampTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,           
  borderColor: "#ffffffff"

  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 6,
  },
  detailLabel: {
    fontWeight: "600",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});
