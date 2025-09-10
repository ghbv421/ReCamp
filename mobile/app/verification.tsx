import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
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
        <View style={styles.Resetcontainer}>
          <Text style={styles.ResetText}> Verification Code </Text>
        </View>

        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.fullname}
            placeholder=" Enter your Verification Code"
            keyboardType="default"
          />
        </View>

        <TouchableOpacity style={styles.nextBtn}>
          <Link href="/setnew">
            <Text style={styles.nextBtnText}>Next</Text>
          </Link>
        </TouchableOpacity>

        <View style={styles.resendcontainer}>
          <Link href="/">
            <Text style={styles.resendTextlink}>Resend Code</Text>
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
    marginTop: 200,
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
  Resetcontainer: {
    marginTop: 1,
  },

  ResetText: {
    textAlign: "center",
    marginTop: 2,
    fontSize: 35,
    fontWeight: "700",
    fontStyle: "normal",
    color: "white",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  fullname: {
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
    marginTop: 90,
  },

  nextBtn: {
    backgroundColor: "#44311A",
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },

  nextBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  resendcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },

  resendTextlink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#187bcd",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
});

export default register;
