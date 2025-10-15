import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.imagecontainers}>
          <Image
            source={require("../assets/images/LogoRECAMP_1.png")}
            style={styles.topImage}
          />
        </View>

        <View style={styles.Textcontainer}>
          <Text style={styles.welcomeText}> Welcome! </Text>
          <Text style={styles.motivationText}> Ready for Camp? </Text>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/login")}

          
        >
          <Text style={styles.logintextbtn}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.registertextbtn}>Register an Account</Text>
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
  },
  imagecontainers: {},
  Textcontainer: {
    //
  },
  welcomeText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontSize: 55,
    fontFamily: "JustMeAgain",
    textShadowColor: "#0b0808ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  motivationText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontSize: 50,
    fontFamily: "JustMeAgain",
    textShadowColor: "#0b0808ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  topImage: {
    width: 131,
    height: 131,
    marginLeft: 125,
    marginTop: 100,
    justifyContent: "center",
  },
  loginBtn: {
    backgroundColor: "#ED8E45",
    marginHorizontal: 50,
    marginTop: 100,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },
  logintextbtn: {
    color: "white",
    fontSize: 18,
  },
  registerBtn: {
    backgroundColor: "#ED8E45",
    marginHorizontal: 50,
    marginTop: 30,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 5,
  },
  registertextbtn: {
    color: "white",
    fontSize: 18,
  },
});

export default Index;
