import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
// ✅ Import the Context Hook
import { useUser } from "../../app/context/UserContext";

export default function ProfilePic() {
  const router = useRouter();
  // ✅ Get the global image & updater function
  const { profileImage, updateProfileImage } = useUser();

  // Local state for the preview (shows changes before you save)
  const [selectedImage, setSelectedImage] = useState(profileImage);
  const [loading, setLoading] = useState(false);

  // 1. Pick from Gallery
  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({ uri: result.assets[0].uri });
    }
  };

  // 2. Take Photo (Camera)
  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to allow camera access.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({ uri: result.assets[0].uri });
    }
  };

  // 3. Save and Sync
  const handleSave = () => {
    setLoading(true);

    // Simulate saving delay
    setTimeout(() => {
      // ✅ Update the global context
      if (selectedImage.uri) {
        updateProfileImage(selectedImage.uri);
      }
      
      setLoading(false);
      Alert.alert("Success", "Profile photo updated!", [
        { text: "OK", onPress: () => router.back() }
      ]);
    }, 1000);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        
        {/* Dynamic Profile Picture Preview */}
        <Image
          source={selectedImage} // 👈 Uses the state, not a static require()
          style={styles.profileImage}
        />

        {/* Options Box */}
        <View style={styles.box}>
          {/* Choose from Gallery */}
          <TouchableOpacity style={styles.option} onPress={handleChoosePhoto}>
            <Ionicons name="image-outline" size={24} color="black" />
            <Text style={styles.text}>Choose Photo</Text>
          </TouchableOpacity>

          {/* Take Photo */}
          <TouchableOpacity style={styles.option} onPress={handleTakePhoto}>
            <Ionicons name="camera-outline" size={24} color="black" />
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          {loading ? (
             <ActivityIndicator color="black" />
          ) : (
             <Text style={styles.saveText}>Save</Text>
          )}
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70, // makes it circular
    borderWidth: 3,
    borderColor: "black",
    marginBottom: 370,
    backgroundColor: '#fff', // fallback color
  },
  box: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "black",
    padding: 30,
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Slightly more visible
    borderRadius: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#FF8C42",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: -50, // Adjusted to fit layout
  },
  saveText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});