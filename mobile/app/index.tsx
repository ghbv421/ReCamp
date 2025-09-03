import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground 
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

const index = () => {
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}  // 👈 local background
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.imagecontainers}>
          <Image
            source={require("../assets/images/logoRECAMP.png")}
            style={styles.topImage}
          />
        </View>

        <View style={styles.Logincontainer}>
          <Text style={styles.LoginText}> Ready for Camp? </Text>
        </View>

        <View style={styles.emailcontainer}>
          <Text style={styles.emailText}> Email </Text>
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
            placeholder="Enter email Address"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.passwordcontainer}>
          <Text style={styles.passwordText}> Password </Text>
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
            placeholder="Enter Password"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.logintextbtn}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registercontainer}>
          <Text style={styles.registertext}>Don't have an Account?</Text>
          <Link href="/register">
            <Text style={styles.registerlink}> Register</Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // makes bg.png cover full screen
  },
  container: {
    flex: 1,
    
  },
  imagecontainers: {},
  topImage: {
    width: 131,
    height: 131,
    marginLeft: 125,
    marginTop: 100,
    justifyContent: "center",
  },
  Logincontainer: {},
  LoginText: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 32,
    fontWeight: "500",
  },
  emailcontainer: {
    marginTop: 44,
  },
  emailText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
    color: "#f3b676ff",
  },
  emailAddressIcon: {},
  emailAddress: {
    flex: 1,
    marginLeft: 10,
  },
  passwordText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
    color: "#f3b676ff",
  },
  inputcontainer: {
    backgroundColor: "#f2f0f0d5",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 30,
    elevation: 5,
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  passwordcontainer: {},
  passwordIcon: {},
  password: {
    flex: 1,
    marginLeft: 10,
  },
  loginBtn: {
    backgroundColor: "#c7a08bff",
    marginHorizontal: 100,
    marginTop: 30,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },
  logintextbtn: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  registercontainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  registertext: {
    color: "white",
  },
  registerlink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#187bcd",
  },
});

export default index;
