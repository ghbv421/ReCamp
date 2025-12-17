import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, ActivityIndicator, SafeAreaView, Platform, StatusBar, KeyboardAvoidingView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// @ts-ignore
import { placesAPI } from '../../services/api'; 
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 

const CATEGORIES = ["Adventure", "River", "Nature", "Mountain", "Cool Weather", "Family"];

export default function AddCampScreen() {
  const router = useRouter(); 
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [entranceFee, setEntranceFee] = useState('');
  const [overnightFee, setOvernightFee] = useState('');
  const [directions, setDirections] = useState('');
  const [tips, setTips] = useState('');
  const [highlights, setHighlights] = useState('');
  const [price, setPrice] = useState('');

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "You need to allow access to your photos.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images' as any, 
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) setImage(result.assets[0].uri);
    } catch (error) {
      Alert.alert('Gallery Error', 'Could not open gallery.');
    }
  };

  const handleSubmit = async () => {
    if (!title || !price || !image) {
      Alert.alert('Missing Info', 'Please fill in required fields and image.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', selectedCategories.join(', '));
      formData.append('entranceFee', entranceFee);
      formData.append('overnightFee', overnightFee);
      formData.append('directions', directions);
      formData.append('tips', tips);
      formData.append('highlights', highlights);
      formData.append('price', price);
      formData.append('image', { uri: image, type: 'image/jpeg', name: 'camp_photo.jpg' } as any);

      await placesAPI.create(formData);
      Alert.alert('Success', 'Camp added successfully!');
      router.back(); 
    } catch (error) {
      Alert.alert('Error', 'Could not add camp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ✅ KEYBOARD FIX */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
          <Text style={styles.header}>Add New Camp</Text>

          <TouchableOpacity onPress={pickImage} style={styles.imagePicker} activeOpacity={0.7}>
            {image ? (
              <Image source={{ uri: image }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholder}>
                <Ionicons name="camera" size={40} color="#666" />
                <Text style={styles.placeholderText}>Tap to Upload Camp Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Camp Name</Text>
          <TextInput style={styles.input} placeholder="e.g. Cowboy's Camp" value={title} onChangeText={setTitle} />

          <Text style={styles.label}>Select Categories</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity 
                key={cat} 
                style={[styles.categoryChip, selectedCategories.includes(cat) && styles.categorySelected]} 
                onPress={() => toggleCategory(cat)}
              >
                <Text style={[styles.categoryText, selectedCategories.includes(cat) && styles.categoryTextSelected]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Location & Info</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Description..." value={description} onChangeText={setDescription} multiline />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Entrance Fee (₱)</Text>
              <TextInput style={styles.input} placeholder="20" keyboardType="numeric" value={entranceFee} onChangeText={setEntranceFee} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Overnight Fee (₱)</Text>
              <TextInput style={styles.input} placeholder="50" keyboardType="numeric" value={overnightFee} onChangeText={setOvernightFee} />
            </View>
          </View>

          <Text style={styles.label}>How to Get There</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Directions..." value={directions} onChangeText={setDirections} multiline />

          <Text style={styles.label}>Things to Consider</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Tips..." value={tips} onChangeText={setTips} multiline />

          <Text style={styles.label}>Highlights</Text>
          <TextInput style={styles.input} placeholder="Hiking, Views..." value={highlights} onChangeText={setHighlights} />

          <Text style={styles.label}>Base Price (Booking)</Text>
          <TextInput style={styles.input} placeholder="500" keyboardType="numeric" value={price} onChangeText={setPrice} />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Create Camp</Text>}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 5, color: '#444' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', fontSize: 16 },
  textArea: { height: 80, textAlignVertical: 'top' },
  row: { flexDirection: 'row' },
  imagePicker: { height: 200, backgroundColor: '#e1e1e1', borderRadius: 10, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: 10 },
  previewImage: { width: '100%', height: '100%' },
  placeholder: { alignItems: 'center' },
  placeholderText: { color: '#666', marginTop: 10 },
  submitBtn: { backgroundColor: '#FF5A5F', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 30 },
  submitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 },
  categoryChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', marginRight: 8, marginBottom: 8, backgroundColor: '#fff' },
  categorySelected: { backgroundColor: '#FF9F1C', borderColor: '#FF9F1C' },
  categoryText: { color: '#666', fontSize: 14 },
  categoryTextSelected: { color: '#fff', fontWeight: 'bold' },
});