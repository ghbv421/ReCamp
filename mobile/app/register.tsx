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

const register = () => {
  return (
    <ImageBackground
        source={require("../assets/images/bg.png")}
        style={styles.background}
        >
    <View style={styles.container}>
      <View style={styles.Registercontainer}>
        <Text style={styles.RegisterText}> REGISTRATION </Text>
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
        <Text style={styles.fullnameText}> Email </Text>
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
        <Text style={styles.fullnameText}> Password </Text>
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
        <Text style={styles.fullnameText}> Phone Number </Text>
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
        <Text style={styles.fullnameText}> Address </Text>
      </View>
      <View style={styles.inputcontainer}>
        <FontAwesome
          name="user"
          size={20}
          color="9A9A9A"
          marginLeft="10"
        ></FontAwesome>
        <TextInput style={styles.Address}
          placeholder="address"
          keyboardType="default"/>
      </View>

      <TouchableOpacity style={styles.RegisterBtn}>
        <Text style={styles.RegisterBtnText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.HaveAcccontainer}>
        <Text style={styles.HaveAccText}>Already have an Account?</Text>
        <Link href="/login">
          <Text style={styles.HaveAccTextlink}> Login</Text>
        </Link>
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
    marginTop: 70,
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
    fontSize: 35,
    fontWeight: "700",
    fontStyle: "normal",
    color: "white",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  fullnamecontainer: {
    marginTop: 20,
  },

  fullnameText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
    color: "white",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  emailAddressIcon: {
    //
  },

  fullname: {},

  emailcontainer: {
    marginTop: 5,
  },

  emailAddress: {
    //
  },

  passwordcontainer: {
    //
  },

  inputcontainer: {
    backgroundColor: "#D9D9D9",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 30,
    elevation: 5,
    marginVertical: 10,
    paddingVertical: 4,
    marginTop: 1,
  },

  passwordIcon: {
    //
  },
  password: {
    //
  },

  phonenumbercontainer: {
    //
  },
  
  phoneIcon: {
    //
  },
  phonenumber: {
    //
  },

  addresscontainer: {
    marginTop: 5,
  },

  Address: {
    //
  },

  RegisterBtn: {
    backgroundColor: "#44311A",
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 100,
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },

  RegisterBtnText:{
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  HaveAcccontainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  HaveAccText:{
    color: "white",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  HaveAccTextlink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#187bcd",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
},

});

export default register;
