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
          <Text style={styles.ResetText}> Set New Password </Text>
        </View>

        <View style={styles.passcontainer}>
          <Text style={styles.passText}> Password </Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.fullname}
            placeholder=" Enter your New Password"
            keyboardType="default"
          />
        </View>

                <View style={styles.confirmcontainer}>
          <Text style={styles.confirmText}> Confirm New Password </Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            style={styles.fullname}
            placeholder=" Confirm your New Password"
            keyboardType="default"
          />
        </View>

        <TouchableOpacity style={styles.confirmBtn}>
          <Link href="/login">
            <Text style={styles.confirmBtnText}>Confirm</Text>
          </Link>
        </TouchableOpacity>
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

  passcontainer: {
    marginTop: 90,
  },

  passText: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "left",
    marginHorizontal: 30,
    color: "white",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },

  confirmcontainer: {
    marginTop: 10,
  },

  confirmText: {
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
    marginTop: 10,
  },

  confirmBtn: {
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

  confirmBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "#0b0808ff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
});

export default register;
