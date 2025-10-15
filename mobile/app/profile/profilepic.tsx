import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfilePic() {
  const navigation = useNavigation();

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("../../assets/images/dashboardbg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Static Profile Picture */}
        <Image
          source={require("../../assets/images/profilepic.png")} // 👈 your static profile image here
          style={styles.profileImage}
        />

        {/* Options Box */}
        <View style={styles.box}>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="image-outline" size={20} color="black" />
            <Text style={styles.text}>Choose Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Ionicons name="camera-outline" size={20} color="black" />
            <Text style={styles.text}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
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
  },
  box: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "black",
    padding: 40,
    width: "80%",
    height: 150,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    borderRadius: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  text: {
    marginLeft: 30,
    fontSize: 18,
    fontWeight: "400",
  },
  saveButton: {
    backgroundColor: "#FF8C42",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
  },
  saveText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
