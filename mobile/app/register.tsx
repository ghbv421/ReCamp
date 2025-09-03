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

const register = () => {
  return (
    <View style={styles.container}>
      <View style={styles.Registercontainer}>
        <Text style={styles.RegisterText}> Register </Text>
      </View>

      <View style={styles.fullnamecontainer}>
        <Text style={styles.fullnameText}> Name </Text>
      </View>
      <View style={styles.inputcontainer}>
        <FontAwesome
          name="user"
          size={20}
          color="9A9A9A"
          marginLeft="10"
        ></FontAwesome>
        <TextInput
          style={styles.fullname}
          placeholder="Enter Fullname"
          keyboardType="default"
        />
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

      <View style={styles.phonenumbercontainer}>
        <Text style={styles.phonenumber}> Phone Number </Text>
      </View>
      <View style={styles.inputcontainer}>
        <FontAwesome
          name="phone"
          size={20}
          color="9A9A9A"
          marginLeft="10"
          style={styles.phonenumber}
        ></FontAwesome>
        <TextInput style={styles.phonenumber} placeholder="+63" />
      </View>

      <View style={styles.addresscontainer}>
        <Text style={styles.addressText}> Address </Text>
      </View>
      <View style={styles.inputcontainer}>
        <FontAwesome
          name="user"
          size={20}
          color="9A9A9A"
          marginLeft="10"
        ></FontAwesome>
        <TextInput
          style={styles.Address}
          placeholder="address"
          keyboardType="default"
        />
      </View>

      <TouchableOpacity style={styles.RegisterBtn}>
        <Text style={styles.RegisterText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.Registercontainer}>
        <Text style={styles.RegisterText}>Already have an Account?</Text>
        <Link href="/register">
          <Text>Login</Text>
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
  Registercontainer: {
    // blank
  },

  RegisterText: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 32,
    fontWeight: "500",
  },

  fullnamecontainer: {
    marginTop: 5,
  },

  fullnameText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
  },

  emailAddressIcon: {
    //
  },

  fullname: {},

  emailcontainer: {
    marginTop: 5,
  },

  emailText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
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

  phonenumberText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
  },

  phonenumbercontainer: {},

  phoneIcon: {},
  phonenumber: {},

  addresscontainer: {
    marginTop: 5,
  },

  addressText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
  },

  Address: {},

  RegisterBtn: {
    backgroundColor: "#D9D9D9",
    marginHorizontal: 100,
    marginTop: 30,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },
  logintextbtn: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  logincontainer: {},
  logintext: {},
});

export default register;
