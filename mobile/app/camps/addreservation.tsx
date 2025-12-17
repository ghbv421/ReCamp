import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, SafeAreaView, Platform, StatusBar, Image, KeyboardAvoidingView 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
// @ts-ignore
import { placesAPI } from '../../services/api'; 
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddReservationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 

  const [loading, setLoading] = useState(true);
  const [camp, setCamp] = useState<any>(null);

  // Form State
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [guests, setGuests] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('Cash'); 

  // Dates
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkInTime, setCheckInTime] = useState(new Date());
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [checkOutTime, setCheckOutTime] = useState(new Date());

  const [showCIDate, setShowCIDate] = useState(false); 
  const [showCITime, setShowCITime] = useState(false);
  const [showCODate, setShowCODate] = useState(false); 
  const [showCOTime, setShowCOTime] = useState(false);

  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    loadCamp();
  }, [id]);

  useEffect(() => {
    if (camp) {
      const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      const stayDuration = diffDays > 0 ? diffDays : 1;
      setNights(stayDuration);
      calculateTotal(stayDuration);
    }
  }, [checkInDate, checkOutDate, guests, camp]);

  const loadCamp = async () => {
    try {
      const { data } = await placesAPI.getOne(id);
      setCamp(data);
    } catch (error) {
      Alert.alert("Error", "Could not load camp info.");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (numNights: number) => {
    const numGuests = parseInt(guests) || 0;
    const entrance = parseFloat(camp.entranceFee) || 0;
    const overnight = parseFloat(camp.overnightFee) || 0;
    setTotalPrice((entrance * numGuests) + (overnight * numGuests * numNights));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const onChangeCheckIn = (event: any, selectedDate?: Date) => {
    setShowCIDate(false);
    if (selectedDate) {
      setCheckInDate(selectedDate);
      if (selectedDate >= checkOutDate) {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        setCheckOutDate(nextDay);
      }
    }
  };

  const onChangeCheckOut = (event: any, selectedDate?: Date) => {
    setShowCODate(false);
    if (selectedDate) setCheckOutDate(selectedDate);
  };

  const handleReview = () => {
    if (!name || !contact || !guests) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    router.push({
      pathname: "/camps/reservationdetails",
      params: {
        campId: id,
        title: camp.title,
        // ✅ CRITICAL FIX: We MUST pass the imageUrl here!
        imageUrl: camp.imageUrl, 
        customer: name,
        contact: contact,
        payment: paymentMethod,
        guest: guests,
        nights: nights,
        totalPrice: totalPrice,
        checkInDate: checkInDate.toDateString(),
        checkInTime: formatTime(checkInTime),
        checkOutDate: checkOutDate.toDateString(),
        checkOutTime: formatTime(checkOutTime),
        stayDuration: `${nights} Night(s)`
      }
    });
  };

  if (loading) return <ActivityIndicator size="large" color="#FF5A5F" style={{marginTop:50}} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
          
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Book Reservation</Text>
          </View>

          {camp?.imageUrl && (
            <Image source={{ uri: camp.imageUrl }} style={styles.campImage} />
          )}

          <View style={styles.campSummary}>
            <Text style={styles.campName}>{camp?.title}</Text>
            <Text style={styles.feesText}>
              Entrance: ₱{camp?.entranceFee || 0} • Overnight: ₱{camp?.overnightFee || 0}/night
            </Text>
          </View>

          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="e.g. Juan Dela Cruz" value={name} onChangeText={setName} />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput style={styles.input} placeholder="e.g. 0917 123 4567" keyboardType="phone-pad" value={contact} onChangeText={setContact} />

          <Text style={styles.sectionLabel}>Check-in Details</Text>
          <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                  <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowCIDate(true)}>
                      <Ionicons name="calendar-outline" size={20} color="#666" style={{marginRight: 8}} />
                      <Text style={{color: '#333'}}>{checkInDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowCITime(true)}>
                      <Ionicons name="time-outline" size={20} color="#666" style={{marginRight: 8}} />
                      <Text style={{color: '#333'}}>{formatTime(checkInTime)}</Text>
                  </TouchableOpacity>
              </View>
          </View>

          <Text style={[styles.sectionLabel, {marginTop: 10}]}>Check-out Details</Text>
          <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                  <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowCODate(true)}>
                      <Ionicons name="calendar" size={20} color="#666" style={{marginRight: 8}} />
                      <Text style={{color: '#333'}}>{checkOutDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowCOTime(true)}>
                      <Ionicons name="time" size={20} color="#666" style={{marginRight: 8}} />
                      <Text style={{color: '#333'}}>{formatTime(checkOutTime)}</Text>
                  </TouchableOpacity>
              </View>
          </View>

          {showCIDate && <DateTimePicker value={checkInDate} mode="date" display="default" onChange={onChangeCheckIn} minimumDate={new Date()} />}
          {showCITime && <DateTimePicker value={checkInTime} mode="time" is24Hour={false} display="default" onChange={(e, d) => { setShowCITime(false); if(d) setCheckInTime(d); }} />}
          {showCODate && <DateTimePicker value={checkOutDate} mode="date" display="default" onChange={onChangeCheckOut} minimumDate={checkInDate} />}
          {showCOTime && <DateTimePicker value={checkOutTime} mode="time" is24Hour={false} display="default" onChange={(e, d) => { setShowCOTime(false); if(d) setCheckOutTime(d); }} />}

          <View style={[styles.row, { marginTop: 15 }]}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Guests</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={guests} onChangeText={setGuests} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Nights (Auto)</Text>
              <View style={[styles.input, { backgroundColor: '#eee' }]}>
                  <Text style={{ color: '#555' }}>{nights}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.label}>Payment Method</Text>
          <View style={styles.paymentRow}>
              {['Cash', 'GCash', 'Bank Transfer'].map((method) => (
                  <TouchableOpacity 
                      key={method}
                      style={[styles.paymentChip, paymentMethod === method && styles.paymentSelected]}
                      onPress={() => setPaymentMethod(method)}
                  >
                      <Text style={[styles.paymentText, paymentMethod === method && styles.paymentTextSelected]}>
                          {method}
                      </Text>
                  </TouchableOpacity>
              ))}
          </View>

          <View style={styles.receipt}>
            <Text style={styles.receiptHeader}>Price Breakdown</Text>
            <View style={styles.receiptRow}>
              <Text>Entrance ({guests} pax)</Text>
              <Text>₱{(parseFloat(camp?.entranceFee || 0) * (parseInt(guests) || 0)).toFixed(2)}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text>Accommodation ({nights} nights)</Text>
              <Text>₱{(parseFloat(camp?.overnightFee || 0) * (parseInt(guests) || 0) * nights).toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.receiptRow}>
              <Text style={styles.totalLabel}>Total Estimated Price</Text>
              <Text style={styles.totalValue}>₱{totalPrice.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleReview}>
            <Text style={styles.submitText}>Review Booking</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginLeft: 10, color: '#333' },
  campImage: { width: '100%', height: 180, borderRadius: 12, marginBottom: 15 },
  campSummary: { backgroundColor: '#FF9F1C', padding: 15, borderRadius: 10, marginBottom: 20 },
  campName: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  feesText: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 5 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 5, color: '#444' },
  sectionLabel: { fontSize: 14, fontWeight: 'bold', color: '#888', marginBottom: 5 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  row: { flexDirection: 'row' },
  pickerBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  paymentRow: { flexDirection: 'row', flexWrap: 'wrap' },
  paymentChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#ccc', marginRight: 10, marginBottom: 10, backgroundColor: '#fff' },
  paymentSelected: { backgroundColor: '#83492B', borderColor: '#83492B' },
  paymentText: { color: '#666' },
  paymentTextSelected: { color: '#fff', fontWeight: 'bold' },
  receipt: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginTop: 25, borderWidth: 1, borderColor: '#eee' },
  receiptHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#FF5A5F' },
  submitBtn: { backgroundColor: '#FF5A5F', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30, marginBottom: 50 },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});