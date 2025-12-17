import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      // 1. Get existing users
      const existingUsers = await AsyncStorage.getItem("@users");
      let users = existingUsers ? JSON.parse(existingUsers) : [];

      // 2. Check if email already exists
      const userExists = users.find((u: any) => u.email === email);
      if (userExists) {
        Alert.alert("Error", "This email is already registered.");
        return;
      }

      // ✅ 3. Auto-Assign Role
      // If email has "@admingmail.com", they become an ADMIN. Otherwise, USER.
      const role = email.toLowerCase().includes("@admingmail.com") ? "admin" : "user";

      // 4. Create User Object
      const newUser = { name, email, password, phone, address, role };
      users.push(newUser);
      
      // 5. Save to Storage
      await AsyncStorage.setItem("@users", JSON.stringify(users));

      Alert.alert("Success", `Account created as ${role.toUpperCase()}!`, [
        { text: "OK", onPress: () => router.push("/login") }
      ]);

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save user data.");
    }
  };

  return (
    <ImageBackground source={require("../assets/images/bg.png")} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            
            <View style={styles.Registercontainer}>
              <Text style={styles.RegisterText}> Sign Up </Text>
            </View>

            <View style={styles.formBox}>
              
              {/* Name */}
              <View style={styles.labelContainer}><Text style={styles.labelText}> Name </Text></View>
              <View style={styles.inputcontainer}>
                <FontAwesome name="user" size={20} color="#9A9A9A" style={{ marginLeft: 10 }} />
                <TextInput style={styles.input} placeholder="Enter Fullname" value={name} onChangeText={setName} />
              </View>

              {/* Email */}
              <View style={styles.labelContainer}><Text style={styles.labelText}> Email </Text></View>
              <View style={styles.inputcontainer}>
                <FontAwesome name="envelope" size={20} color="#9A9A9A" style={{ marginLeft: 10 }} />
                <TextInput style={styles.input} placeholder="Enter Email Address" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
              </View>

              {/* Password */}
              <View style={styles.labelContainer}><Text style={styles.labelText}> Password </Text></View>
              <View style={styles.inputcontainer}>
                <FontAwesome name="lock" size={20} color="#9A9A9A" style={{ marginLeft: 10 }} />
                <TextInput style={styles.input} placeholder="Enter Password" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} color="#9A9A9A" style={{ marginRight: 10 }} />
                </TouchableOpacity>
              </View>

              {/* Phone */}
              <View style={styles.labelContainer}><Text style={styles.labelText}> Phone Number </Text></View>
              <View style={styles.inputcontainer}>
                <FontAwesome name="phone" size={20} color="#9A9A9A" style={{ marginLeft: 10 }} />
                <TextInput style={styles.input} placeholder="+63" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
              </View>

              {/* Address */}
              <View style={styles.labelContainer}><Text style={styles.labelText}> Address </Text></View>
              <View style={styles.inputcontainer}>
                <FontAwesome name="home" size={20} color="#9A9A9A" style={{ marginLeft: 10 }} />
                <TextInput style={styles.input} placeholder="Enter Address" value={address} onChangeText={setAddress} />
              </View>

              <TouchableOpacity style={styles.RegisterBtn} onPress={handleRegister}>
                <Text style={styles.RegisterBtnText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.HaveAcccontainer}>
                <Text style={styles.HaveAccText}>Already have an Account?</Text>
                <Link href="/login"><Text style={styles.HaveAccTextlink}> Sign In</Text></Link>
              </View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  scrollContainer: { flexGrow: 1, paddingTop: 50, paddingBottom: 100 },
  Registercontainer: { marginBottom: 10 },
  RegisterText: { textAlign: "center", fontSize: 35, fontWeight: "700", color: "white", textShadowColor: "#0b0808ff", textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 2 },
  formBox: { backgroundColor: "#51351a66", marginHorizontal: 20, marginTop: 10, borderRadius: 15, padding: 20 },
  labelContainer: { marginTop: 15 },
  labelText: { fontSize: 18, fontWeight: "500", marginLeft: 10, color: "white", textShadowColor: "#0b0808ff", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 },
  inputcontainer: { backgroundColor: "#D9D9D9", flexDirection: "row", alignItems: "center", borderRadius: 20, elevation: 5, marginVertical: 5, paddingVertical: 10, paddingHorizontal: 15 },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: "#000" },
  RegisterBtn: { backgroundColor: "#ED8E45", borderWidth: 1, marginHorizontal: 50, marginTop: 30, borderRadius: 20, paddingVertical: 12, alignItems: "center", elevation: 5 },
  RegisterBtnText: { color: "#000", fontSize: 18, fontWeight: "bold" },
  HaveAcccontainer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  HaveAccText: { color: "white" },
  HaveAccTextlink: { fontSize: 14, fontWeight: "bold", color: "#187bcd", marginLeft: 5 },
});

export default Register;