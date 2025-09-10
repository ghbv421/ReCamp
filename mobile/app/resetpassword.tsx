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
          <Text style={styles.ResetText}> RESET PASSWORD </Text>
        </View>

        <View style={styles.emailcontainer}>
          <Text style={styles.emailText}> Email </Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.fullname}
            placeholder=" Enter your Registered Email"
            keyboardType="default"
          />
        </View>

        <TouchableOpacity style={styles.SendBtn}>
          <Link href="/verification">
            <Text style={styles.SendBtnText}>Send Code</Text>
          </Link>
        </TouchableOpacity>

        <View style={styles.remembercontainer}>
          <Text style={styles.rememberText}>Remember your Password?</Text>
          <Link href="/login">
            <Text style={styles.rememberTextlink}> Sign In</Text>
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
    textShadowColor: "#090202ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  emailcontainer: {
    marginTop: 90,
  },

  emailText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
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
    marginTop: 20,
  },

  SendBtn: {
    backgroundColor: "#44311A",
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 30,
    marginTop: 50,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },

  SendBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  remembercontainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  rememberText: {
    color: "white",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  rememberTextlink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#187bcd",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
});

export default register;
