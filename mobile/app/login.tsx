import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    router.replace("/dashboard/home");
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.imagecontainers}>
          <Image
            source={require("../assets/images/logoRECAMP.png")}
            style={styles.topImage}
          />
        </View>
        <View style={styles.formBox}>
          <View style={styles.Logincontainer}>
            <Text style={styles.LoginText}>Sign In</Text>
          </View>

          <View style={styles.inputcontainer}>
            <FontAwesome
              name="user"
              size={20}
              color="#9A9A9A"
              style={styles.emailAddressIcon}
            />
            <TextInput
              style={styles.emailAddress}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputcontainer}>
            <FontAwesome
              name="lock"
              size={20}
              color="#9A9A9A"
              style={styles.passwordIcon}
            />
            <TextInput
              style={styles.password}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.forgetpasscontainer}>
            <Link href="/resetpassword">
              <Text style={styles.passwordlink}>Forget Password?</Text>
            </Link>
            <Link href="/register">
              <Text style={styles.registerlink}>Sign Up</Text>
            </Link>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
            <Text style={styles.logintextbtn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
  },
  imagecontainers: {
    // blank
  },
  topImage: {
    width: 131,
    height: 131,
    marginLeft: 125,
    marginTop: 100,
    justifyContent: "center",
  },
  Logincontainer: {
    // blank
  },
  LoginText: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 32,
    fontWeight: "500",
    color: "white",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  formBox: {
    backgroundColor: "#51351a66",
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 15,
    padding: 20,
  },
  inputcontainer: {
    backgroundColor: "#f2f0f0d5",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 5,
    elevation: 5,
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  emailAddressIcon: {
    // blank
  },
  emailAddress: {
    flex: 1,
    marginLeft: 10,
  },
  passwordIcon: {
    // blank
  },
  password: {
    flex: 1,
    marginLeft: 10,
  },
  forgetpasscontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 5,
  },
  passwordlink: {
    color: "#FFCDB2",
    fontWeight: "bold",
  },
  loginBtn: {
    backgroundColor: "#ED8E45",
    marginHorizontal: 50,
    marginTop: 30,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },
  logintextbtn: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerlink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFCDB2",
  },
});

export default Login;
