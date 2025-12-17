import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
// ✅ Import Context
import { useUser } from "../app/context/UserContext";

const Login = () => {
  const router = useRouter();
  const { updateUserData } = useUser(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const existingUsers = await AsyncStorage.getItem("@users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // Check credentials
      const user = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (user) {
        // ✅ User Found!
        // Ensure role exists (fallback to 'user' if undefined)
        const userRole = user.role || (user.email.includes("@admingmail.com") ? "admin" : "user");

        // ✅ Update Global Context
        if (updateUserData) {
            updateUserData({
                name: user.name,
                email: user.email,
                contact: user.phone,
                address: user.address,
                role: userRole // Save role!
            });
        }

        Alert.alert("Success", `Welcome back, ${user.name}!`);
        router.replace("/dashboard/home");
      } else {
        Alert.alert("Login Failed", "Invalid email or password.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <ImageBackground source={require("../assets/images/bg.png")} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
          <View style={styles.imagecontainers}>
            <Image source={require("../assets/images/logoRECAMP.png")} style={styles.topImage} />
          </View>
          
          <View style={styles.formBox}>
            <View style={styles.Logincontainer}>
              <Text style={styles.LoginText}>Sign In</Text>
            </View>

            <View style={styles.inputcontainer}>
              <FontAwesome name="user" size={20} color="#9A9A9A" />
              <TextInput style={styles.emailAddress} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            </View>

            <View style={styles.inputcontainer}>
              <FontAwesome name="lock" size={20} color="#9A9A9A" />
              <TextInput style={styles.password} placeholder="Password" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                 <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} color="#9A9A9A" />
              </TouchableOpacity>
            </View>

            <View style={styles.forgetpasscontainer}>
              <Link href="/resetpassword"><Text style={styles.passwordlink}>Forget Password?</Text></Link>
              <Link href="/register"><Text style={styles.registerlink}>Sign Up</Text></Link>
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
              <Text style={styles.logintextbtn}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: { flexGrow: 1, justifyContent: 'center' },
  imagecontainers: { alignItems: 'center', marginTop: 60 },
  topImage: { width: 131, height: 131 },
  Logincontainer: { marginBottom: 10 },
  LoginText: { textAlign: "center", marginTop: 5, marginBottom: 10, fontSize: 32, fontWeight: "500", color: "white", textShadowColor: "#0b0808ff", textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 2 },
  formBox: { backgroundColor: "#51351a66", marginHorizontal: 20, marginTop: 30, borderRadius: 15, padding: 20, marginBottom: 50 },
  inputcontainer: { backgroundColor: "#f2f0f0d5", flexDirection: "row", alignItems: "center", borderRadius: 20, marginHorizontal: 5, elevation: 5, marginVertical: 10, paddingVertical: 12, paddingHorizontal: 15 },
  emailAddress: { flex: 1, marginLeft: 10, fontSize: 16 },
  password: { flex: 1, marginLeft: 10, fontSize: 16 },
  forgetpasscontainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 25, marginTop: 5 },
  passwordlink: { color: "#FFCDB2", fontWeight: "bold" },
  registerlink: { fontSize: 14, fontWeight: "bold", color: "#FFCDB2" },
  loginBtn: { backgroundColor: "#ED8E45", marginHorizontal: 50, marginTop: 30, borderRadius: 20, paddingVertical: 12, alignItems: "center", elevation: 5 },
  logintextbtn: { color: "#000", fontSize: 18, fontWeight: "bold" },
});

export default Login;