import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, SafeAreaView, Platform, StatusBar
} from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import { placesAPI } from '../../services/api';
// ✅ Import Context to check Admin Role
import { useUser } from '../../app/context/UserContext';

export default function CampDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // ✅ Get User Data
  const { userData } = useUser();
  const isAdmin = userData?.role === 'admin';

  const [camp, setCamp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (id) loadCamp();
    }, [id])
  );

  const loadCamp = async () => {
    try {
      const { data } = await placesAPI.getOne(id);
      setCamp(data);
    } catch (error) {
      Alert.alert("Error", "Could not load camp details");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Camp",
      "Are you sure you want to delete this camp?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", style: "destructive", 
          onPress: async () => {
            try {
              setLoading(true);
              await placesAPI.delete(id);
              router.replace("/dashboard/home"); 
            } catch (error) {
              Alert.alert("Error", "Could not delete camp.");
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#FF5A5F" />;
  if (!camp) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Camp not found</Text>;

  const highlightsList = camp.highlights ? camp.highlights.split(',').map((h: string) => h.trim()) : [];
  const categoryList = camp.category ? camp.category.split(',').map((c: string) => c.trim()) : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* HEADER IMAGE & BUTTONS */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: camp.imageUrl }} style={styles.headerImage} />
            
            {/* Back Button (Visible to everyone) */}
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* ✅ ADMIN ONLY: Edit & Delete Buttons */}
            {isAdmin && (
              <>
                <TouchableOpacity 
                  style={styles.editBtn} 
                  onPress={() => router.push({ pathname: "/camps/editCamp", params: { id: camp._id } })}
                >
                  <Ionicons name="pencil" size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                  <Ionicons name="trash-outline" size={20} color="white" />
                </TouchableOpacity>
              </>
            )}

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{camp.title}</Text>
            </View>
          </View>

          {/* CONTENT SECTIONS */}
          <View style={styles.content}>
            {highlightsList.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Highlights & Activities</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsRow}>
                  {highlightsList.map((item: string, index: number) => (
                    <View key={index} style={styles.highlightChip}>
                      <Text style={styles.highlightText}>{item}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Location */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Ionicons name="location-outline" size={20} color="#FF9F1C" />
                <Text style={styles.cardTitle}>Location & Info</Text>
              </View>
              <Text style={styles.cardBody}>{camp.description || "No description provided."}</Text>
            </View>

            {/* Categories */}
            {categoryList.length > 0 && (
              <View style={styles.card}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="pricetags-outline" size={20} color="#FF9F1C" />
                  <Text style={styles.cardTitle}>Categories</Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  {categoryList.map((cat: string, index: number) => (
                    <View key={index} style={styles.categoryRow}>
                      <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" style={{ marginRight: 8 }} />
                      <Text style={styles.categoryItemText}>{cat}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Fees */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Ionicons name="cash-outline" size={20} color="#FF9F1C" />
                <Text style={styles.cardTitle}>Fees</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Entrance Fee:</Text>
                <Text style={styles.feeValue}>
                  {camp.entranceFee ? `₱${camp.entranceFee}` : 'Free / Not set'}
                </Text>
              </View>
              <View style={[styles.feeRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.feeLabel}>Overnight Fee:</Text>
                <Text style={styles.feeValue}>
                  {camp.overnightFee ? `₱${camp.overnightFee} / night` : 'Not set'}
                </Text>
              </View>
            </View>

            {/* Directions */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Ionicons name="walk-outline" size={20} color="#FF9F1C" />
                <Text style={styles.cardTitle}>How to Get There</Text>
              </View>
              <Text style={styles.cardBody}>{camp.directions || "No directions provided."}</Text>
            </View>

            {/* Tips */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Ionicons name="warning-outline" size={20} color="#FF9F1C" />
                <Text style={styles.cardTitle}>Things to Consider</Text>
              </View>
              <Text style={styles.cardBody}>{camp.tips || "No tips provided."}</Text>
            </View>
          </View>
        </ScrollView>

        {/* FOOTER BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.reserveBtn} 
            onPress={() => router.push({ pathname: "/camps/addreservation", params: { id: camp._id } })}
          >
            <Text style={styles.reserveText}>Add Reservation</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  
  imageContainer: { position: 'relative' },
  headerImage: { width: '100%', height: 250 },
  
  backBtn: { position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(255,255,255,0.8)', padding: 8, borderRadius: 50 },
  editBtn: { position: 'absolute', top: 20, right: 70, backgroundColor: '#007AFF', padding: 8, borderRadius: 50 },
  deleteBtn: { position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255, 0, 0, 0.7)', padding: 8, borderRadius: 50 },

  titleContainer: { position: 'absolute', top: 190, left: 20, backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  content: { padding: 15 },
  section: { marginBottom: 15 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#FF9F1C', marginBottom: 10 },
  highlightsRow: { flexDirection: 'row' },
  highlightChip: { backgroundColor: '#FF9F1C', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10 },
  highlightText: { color: '#fff', fontWeight: '600' },
  
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FF9F1C', marginLeft: 8 },
  cardBody: { fontSize: 14, color: '#333', lineHeight: 20 },
  
  feeRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  feeLabel: { fontSize: 14, color: '#666' },
  feeValue: { fontSize: 15, fontWeight: 'bold', color: '#333' },

  categoryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  categoryItemText: { fontSize: 15, color: '#333' },

  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: 'transparent' },
  reserveBtn: { backgroundColor: '#FF9F1C', padding: 15, borderRadius: 30, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  reserveText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});