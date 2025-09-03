import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainers}>
        <Image
          source={require("../assets/images/logoRECAMP.png")}
          style={styles.topImage}
        ></Image>
      </View>

      <View style={styles.Logincontainer}>
        <Text style={styles.LoginText}> Login </Text>
      </View>

      <View style={styles.emailcontainer}>
        <Text style={styles.emailText}> Email </Text>
      </View>
      <View style={styles.inputcontainer}>
        <FontAwesome
          name="user"
          size={20}
          color="9A9A9A"
          marginLeft="10"
          style={styles.emailAddressIcon}
        ></FontAwesome>
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
          color="9A9A9A"
          marginLeft="10"
          style={styles.passwordIcon}
        ></FontAwesome>
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
        <Text>register</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },

  emailAddressIcon: {
    //
  },

  emailAddress: {},

  passwordText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
  },
  inputcontainer: {
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 30,
    elevation: 5,
    marginVertical: 10,
    paddingVertical: 12,
  },
  passwordcontainer: {},

  passwordIcon: {},
  password: {},

  loginBtn: {
    backgroundColor: "black",
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
    
  },
  registertext: {

  },

});

export default index;
